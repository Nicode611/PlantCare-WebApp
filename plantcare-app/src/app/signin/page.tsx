import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { signIn, providerMap } from "@/auth"
import Image from "next/image"

// Assurez-vous que SIGNIN_ERROR_URL est défini ou importé
const SIGNIN_ERROR_URL = "/signin-error";

export default async function SignInPage({ searchParams }: {
    searchParams: Promise<{ callbackUrl?: string }>
}) {
    const callbackUrl = (await searchParams).callbackUrl ?? "";

  return (
    <div className="flex flex-col gap-2">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="../" className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <div className="flex items-center justify-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="10%" viewBox="0 0 544 544">                    
                        <path fill="#000000" opacity="1.000000" stroke="none" d=" M28.468658,545.000000   C20.189770,540.190125 18.859058,532.728027 18.866772,524.283264   C18.960863,421.292480 19.017075,318.301361 18.779449,215.311005   C18.754047,204.301682 22.224247,196.992386 31.655109,190.470825   C91.121819,149.348740 150.139893,107.577843 209.305573,66.020462   C228.393112,52.613571 247.569641,39.330833 266.528412,25.744263   C276.447998,18.635508 287.185974,18.585068 297.427582,25.402973   C363.712158,69.529037 430.236481,113.294930 496.683105,157.177612   C510.029541,165.991882 523.365967,174.821396 536.735840,183.600006   C541.114319,186.474884 543.388733,190.360855 543.386719,195.669113   C543.369751,240.934601 543.400635,286.200104 543.405823,331.465576   C543.413391,396.626953 543.318604,461.788635 543.540039,526.949280   C543.565552,534.448792 541.754822,540.311707 535.209045,544.740479   C366.312439,545.000000 197.624878,545.000000 28.468658,545.000000  M242.713760,282.221039   C236.518555,288.962555 230.334961,295.714783 224.125885,302.443451   C208.090912,319.820221 192.076126,337.215881 175.962570,354.519531   C173.977371,356.651337 173.282944,358.858093 173.286392,361.689789   C173.346497,411.012787 173.399689,460.336090 173.238205,509.658630   C173.221954,514.625000 174.943298,515.789429 179.595490,515.785339   C287.403748,515.690735 395.212158,515.729309 503.020538,515.727539   C510.080444,515.727417 510.646271,515.110291 510.646545,507.974701   C510.650269,408.995300 510.604584,310.015808 510.764313,211.036652   C510.773468,205.373474 508.975372,201.952866 504.238403,198.878296   C476.296661,180.742432 448.528290,162.339050 420.729889,143.982849   C376.393372,114.705963 332.052216,85.435890 287.799927,56.032139   C283.700775,53.308437 280.657104,53.476082 276.670715,56.314129   C249.804855,75.440742 222.790329,94.358696 195.808472,113.322205   C149.615372,145.787842 103.429161,178.263412 57.174534,210.641220   C53.701805,213.072083 52.217747,215.710007 52.250698,220.095520   C52.548611,259.748474 52.705357,299.403290 52.695915,339.057526   C52.682503,395.374481 52.491329,451.691376 52.381939,508.008301   C52.368492,514.931458 53.172054,515.721436 60.154583,515.722107   C84.315086,515.724243 108.475601,515.726685 132.636093,515.713074   C139.666519,515.709106 139.732346,515.641541 139.732468,508.868744   C139.733368,460.379150 139.727982,411.889587 139.706482,363.399994   C139.705750,361.741730 139.811554,359.996796 139.358780,358.440308   C137.410797,351.743683 139.704391,346.593689 144.312088,341.708435   C158.251114,326.929749 171.948807,311.923615 185.762787,297.026764   C206.033569,275.166962 226.328659,253.329727 246.598114,231.468704   C248.799576,229.094406 251.336594,227.376923 254.465179,226.395874   C261.992798,224.035416 270.793823,226.570923 274.657776,232.357758   C278.537170,238.167786 277.263062,245.121826 271.118744,251.723480   C261.815399,261.719238 252.516098,271.718719 242.713760,282.221039  z"/>
                        <path fill="#13810B" opacity="1.000000" stroke="none" d=" M238.793610,313.812775   C256.142334,294.895752 273.349396,276.328827 290.323578,257.551422   C293.373962,254.176971 295.335846,254.144196 298.786591,256.991333   C319.599701,274.163788 331.597656,295.471375 329.167480,323.055145   C327.455353,342.488647 317.451691,357.679657 301.477600,368.441162   C275.378357,386.023956 247.123505,387.319122 217.844116,377.831787   C210.847687,375.564728 204.293274,372.251465 197.987717,368.488007   C192.248917,365.062805 192.261154,364.630890 196.714584,359.778595   C210.680618,344.561707 224.621613,329.321838 238.793610,313.812775  z"/>
                    </svg>
                    <span className="pl-2">PlantCare</span>
                </div>
            </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              {/* Formulaire d'email et de password */}
              <form className="space-y-4 md:space-y-6" action="#">
                <fieldset disabled className="opacity-50">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#abcba5] hover:bg-[#277a1c] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                </fieldset>
              </form>

              {/* Séparateur visuel */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

                {/* Boutons pour OAuth */}
                <div className="space-y-2">
                {Object.values(providerMap).map((provider, index) => (
                    <form
                        key={index}
                        action={async () => {
                        "use server";
                        try {
                            await signIn(provider.id, { redirectTo: callbackUrl });
                        } catch (error) {
                            if (error instanceof AuthError) {
                            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                            }
                            throw error;
                        }
                        }}
                    >
                        <button
                        type="submit"
                        className="w-full text-black bg-white border border-gray-300 hover:bg-gray-100 rounded-lg px-5 py-2.5"
                        >
                            <div className="flex justify-center">
                                <Image
                                src={"/icons/" + provider.name + "-logo.svg"}
                                alt={provider.name + " logo"}
                                width={25}
                                height={25}
                                />
                            <span className="pl-2">Sign in with {provider.name}</span>
                            </div>
                        </button>
                    </form>
                ))}
                </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}