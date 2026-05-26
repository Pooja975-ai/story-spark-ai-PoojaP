import React from "react";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    duration: "/month",
    features: [
      "Basic AI writing assistance",
      "5 stories per month",
      "Community access",
    ],
    buttonLabel: "Get Started",
    buttonStyle:
      "bg-slate-700 text-white hover:bg-slate-600 hover:shadow-slate-500/20",
    highlight: false,

    // Free plan → signup
    linkto: "/signup",
  },
  {
    title: "Pro",
    price: "$19",
    duration: "/month",
    features: [
      "Advanced AI writing tools",
      "Unlimited stories",
      "Priority support",
      "Analytics dashboard",
    ],
    buttonLabel: "Start Pro Trial",
    buttonStyle:
      "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/30",
    highlight: true,

    // Pass plan info to payment page
    linkto: "/payment?plan=Pro&price=19",
  },
  {
    title: "Enterprise",
    price: "$49",
    duration: "/month",
    features: [
      "Custom AI models",
      "Team collaboration",
      "API access",
      "24/7 dedicated support",
    ],
    buttonLabel: "Contact Sales",
    buttonStyle:
      "bg-slate-700 dark:bg-slate-800 text-white hover:bg-slate-600 dark:hover:bg-slate-700 hover:shadow-blue-500/20",
    highlight: false,

    // Enterprise → sales page
    linkto: "/sales",
  },
];

const PricingComponent = () => {
  const navigate = useNavigate();

  return (
    <section className="story-section" id="pricing-section">
      <div className="story-page-shell">
      <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
        <h2 className="story-section-heading">
          Simple, Transparent Pricing
        </h2>
        <p className="story-section-copy mt-4">
    <section className="mb-16 py-12" id="pricing-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-gray-300">
          Simple, Transparent Pricing
        </h2>

        <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the plan that best fits your needs
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`
              motion-card
              story-panel
              p-8
              rounded-lg
              cursor-pointer
              hover:border-indigo-400/50
              transition-all duration-300
              ${
                plan.highlight
                  ? "border-indigo-500/70 relative md:scale-[1.03] shadow-indigo-500/10"
                  : ""
              }
            `}
          >
            {plan.highlight && (
              <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-indigo-600 px-3 py-1 text-sm font-semibold text-white">
                Popular
              </div>
            )}
            <h3 className="mb-2 text-xl font-bold text-slate-100">
              {plan.title}
            </h3>
            <div className="mb-4">
              <span className="text-4xl font-extrabold text-slate-50">{plan.price}</span>
              <span className="text-slate-500">{plan.duration}</span>
            </div>
            <ul className="mb-8 space-y-3 text-slate-400">

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-gray-300">
              {plan.title}
            </h3>

            {/* Price */}
            <div className="mb-4">
              <span className="text-4xl font-bold text-slate-900 dark:text-gray-300">
                {plan.price}
              </span>

              <span className="text-slate-500 dark:text-gray-500">
                {plan.duration}
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 text-slate-600 dark:text-gray-500">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`motion-cta mt-6 block w-full rounded-lg px-4 py-3 text-center font-semibold shadow-lg ${plan.buttonStyle}`}
              onClick={() => {
                navigate(plan.linkto);
              }}
              className={`motion-cta mt-6 block w-full text-center font-medium py-2.5 px-4 rounded-lg shadow-lg transition-all duration-200 ${plan.buttonStyle}`}
              onClick={() => navigate(plan.linkto)}
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default PricingComponent;