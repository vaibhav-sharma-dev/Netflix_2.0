import React from "react";
import "./PlansSection.css";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";


export default function PlansSection() {

    const [products, setProducts] = React.useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = React.useState(null);

    React.useEffect(() => {
        db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])

    React.useEffect(() => {
        db.collection("products")
        .where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        prideData: price.data(),
                    };
                });
            });

            setProducts(products);
        });

    }, []);

    console.log(products);

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            })

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if (error)
                alert(`An error occured: ${error.message}`);

            if (sessionId) {
                const stripe = await loadStripe(
                    "pk_test_51NpXArSByZoD3xVsol9HwkEJRsISSSwwlJ655uJ14VGT1PS0lSyjiu7u3VTOSioKK6mIThl9KZp6pusO5rDhFf1u004ZDOwFRw"
                );

                stripe.redirectToCheckout({sessionId});
            }
        })
    }

    return (
        <div className="plans_section">
            <br />
            {subscription && (
                <p>
                    Renewal date:{" "}
                    {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
                </p>
            )}

            {Object.entries(products).map(([productId, productData]) => {

                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

                return (
                    <div
                        key={productId} 
                        className={
                            `${isCurrentPackage && "plans_section_plans--disabled"} plans_section_plans`
                        }
                    >
                        <div className="plans_sections_plans_info">
                            <h5>{productData.name}</h5>

                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick={() =>
                            !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                        >
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}