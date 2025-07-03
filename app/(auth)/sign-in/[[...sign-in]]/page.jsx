import { SignIn } from '@clerk/nextjs'

export default function Page() {

    return (
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
                <div className="relative z-10 w-full max-w-md">
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-white text-3xl font-bold">Welcome to AI Interview Mocker</h3>
                        <p className="text-gray-300">
                            Create an account and get access to all features .
                        </p>
                    </div>
                </div>
                <div
                    className="absolute inset-0 my-auto h-[500px]"
                    style={{
                        background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                    }}
                >

                </div>
            </div>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                  
                    
                    <SignIn/>
                </div>
            </div>
        </main>
    )


  
  
  
}