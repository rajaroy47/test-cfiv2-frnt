import { useEffect, useState } from "react";
import { getAllServices } from "../api/public/serviceApi";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServices = async () => {
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
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 md:py-16">
      <div className="mx-auto w-[90%] max-w-7xl">
        {/* HOMEPAGE HERO HEADER */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700 mb-4">
            Explore Categories
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Our Premium Services
          </h1>
          <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
            Find and access expert-led solutions, custom-tailored plan bundles,
            and top-tier marketplace support built entirely for your business
            requirements.
          </p>
        </div>

        {/* LOADING STATE (SKELETONS) */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-4"
              >
                <div className="h-[180px] w-full rounded-xl bg-slate-200"></div>
                <div className="h-6 w-2/3 rounded bg-slate-200 mt-2"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-slate-200"></div>
                  <div className="h-4 w-5/6 rounded bg-slate-200"></div>
                </div>
                <div className="h-10 w-1/3 rounded-lg bg-slate-200 mt-auto"></div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center text-slate-500">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              No services available right now.
            </h3>
            <p className="text-sm">
              Please check back later or refresh the page.
            </p>
          </div>
        ) : (
          /* ACTUAL SERVICES GRID */
          // <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ease-in-out">
          //   {services.map((service) => (
          //     <ServiceCard key={service._id} service={service} />
          //   ))}
          // </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ease-in-out">
            {services?.map((service) =>
              service.isActive ? (
                <ServiceCard key={service._id} service={service} />
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
