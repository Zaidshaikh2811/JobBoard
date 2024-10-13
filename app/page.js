import { fetchProfileAction } from '@/actions';
import HomePageButtonControls from '@/components/homepage-button-controls';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';


export const metadata = {
  title: "Your Gateway to Top Jobs - Find Your Dream Career",
  description: "Discover top job opportunities from leading companies. Explore the best job portal to find your next career move with ease.",
};

export default async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <section className="flex w-full h-[95vh] flex-col items-center justify-center p-8 lg:p-24 bg-gradient-to-r from-blue-100 to-white mt-4">
      <div className="relative w-full">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left section with text */}
          <div className="lg:w-[70%] space-y-8">
            <span className="flex space-x-2 items-center">
              <span className="block w-14 mb-2 border-b-4 border-indigo-600"></span>
              <span className="font-medium text-gray-600">
                One Stop Solution To Find Jobs
              </span>
            </span>
            <h1 className="text-4xl font-extrabold md:text-6xl text-gray-900 leading-tight">
              The Best <br />
              <span className="text-indigo-600">Job Portal App</span>
            </h1>
            <p className="text-xl text-gray-700">
              Find the Best Jobs From Top Product-Based Companies.
            </p>
            <div className="flex space-x-4">
              <HomePageButtonControls
                profileInfo={profileInfo}
                user={JSON.parse(JSON.stringify(user))}
              />
            </div>
          </div>

          {/* Right section with image */}
          <div className="lg:w-[50%] flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dhyczd7jv/image/upload/v1724409403/undraw_job_hunt_re_q203_1_z9tiiz.svg" // Dummy image URL
              alt="Homepage illustration"
              width={1000}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
