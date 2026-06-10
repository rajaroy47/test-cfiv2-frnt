// import { useEffect, useState } from "react";
// import { getAllServices } from "../api/serviceApi";
// import ServiceCard from "../components/ServiceCard";

// const Home = () => {
//   const [services, setServices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchServices = async () => {
//     try {
//       setIsLoading(true);
//       const data = await getAllServices();
//       setServices(data || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-50 py-10 md:py-16">
//       <div className="mx-auto w-[90%] max-w-7xl">

//         {/* HOMEPAGE HERO HEADER */}
//         <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
//           <span className="inline-block rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700 mb-4">
//             Explore Categories
//           </span>
//           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
//             Our Premium Services
//           </h1>
//           <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
//             Find and access expert-led solutions, custom-tailored plan bundles, and top-tier marketplace support built entirely for your business requirements.
//           </p>
//         </div>

//         {/* LOADING STATE (SKELETONS) */}
//         {isLoading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {[1, 2, 3].map((n) => (
//               <div key={n} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-4">
//                 <div className="h-[180px] w-full rounded-xl bg-slate-200"></div>
//                 <div className="h-6 w-2/3 rounded bg-slate-200 mt-2"></div>
//                 <div className="space-y-2">
//                   <div className="h-4 w-full rounded bg-slate-200"></div>
//                   <div className="h-4 w-5/6 rounded bg-slate-200"></div>
//                 </div>
//                 <div className="h-10 w-1/3 rounded-lg bg-slate-200 mt-auto"></div>
//               </div>
//             ))}
//           </div>
//         ) : services.length === 0 ? (
//           /* EMPTY STATE */
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center text-slate-500">
//             <h3 className="text-lg font-semibold text-slate-700 mb-2">
//               No services available right now.
//             </h3>
//             <p className="text-sm">Please check back later or refresh the page.</p>
//           </div>
//         ) : (
//           /* ACTUAL SERVICES GRID */
//           // <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ease-in-out">
//           //   {services.map((service) => (
//           //     <ServiceCard key={service._id} service={service} />
//           //   ))}
//           // </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ease-in-out">
//             {services?.map((service) =>
//               service.isActive ? (
//                 <ServiceCard
//                   key={service._id}
//                   service={service}
//                 />
//               ) : null
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";
import { getAllServices } from "../api/public/serviceApi";
import { useEffect, useState } from "react";

function Home() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopularServices = async () => {
    try {
      setIsLoading(true);
      const data = await getAllServices();
      setServices(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularServices();
  }, []);

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <span className="mb-6 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            India's Trusted Business Compliance Platform
          </span>

          <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
            Start & Grow Your
            <span className="text-blue-600"> Business </span>
            Without Legal Hassles
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            GST Registration, FSSAI License, Company Registration, Trademark
            Filing, MSME Registration and much more — handled by experts.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/services"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Explore Services
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Talk To Expert
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-600">5K+</h3>
            <p className="mt-2 text-slate-600">Businesses Registered</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-600">98%</h3>
            <p className="mt-2 text-slate-600">Success Rate</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-600">24/7</h3>
            <p className="mt-2 text-slate-600">Expert Support</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-600">10+</h3>
            <p className="mt-2 text-slate-600">Years Experience</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Popular Services
          </h2>

          <p className="mt-4 text-slate-600">
            Everything you need to start and manage your business.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => {
            return service.isPopular ? (
              <div
                key={service._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {service.name}
                </h3>

                <p className="mt-3 text-slate-600">
                  {service.shortDescription}
                </p>

                <Link
                  to={`/service/${service.slug}`}
                  className="mt-12 font-semibold text-blue-600"
                >
                  Learn More →
                </Link>
              </div>
            ) : null;
          })}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Why Choose CFI?
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">Expert Guidance</h3>

              <p className="mt-3 text-slate-600">
                Dedicated compliance experts for every service.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">Transparent Pricing</h3>

              <p className="mt-3 text-slate-600">
                No hidden fees. Pay only what you see.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">Fast Processing</h3>

              <p className="mt-3 text-slate-600">
                Quick turnaround with real-time updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">How It Works</h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              1
            </div>

            <h3 className="mt-5 text-xl font-bold">Choose Service</h3>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              2
            </div>

            <h3 className="mt-5 text-xl font-bold">Upload Documents</h3>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              3
            </div>

            <h3 className="mt-5 text-xl font-bold">Get Approved</h3>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready To Start Your Business?
          </h2>

          <p className="mt-4 text-blue-100">
            Join thousands of entrepreneurs using CFI.
          </p>

          <Link
            to="/services"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:bg-slate-100"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
