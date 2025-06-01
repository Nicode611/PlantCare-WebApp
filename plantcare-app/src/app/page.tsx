'use client';

// React
import React from 'react';
import Image from 'next/image';

// Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
/* import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; */
import 'swiper/css';
import 'swiper/css/pagination';

// CSS
import "@/styles/home.css"

// Auth.JS
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
    if (status === 'authenticated') {
        router.push('/home');
    }
    }, [status, router]);

    if (status === 'loading') {
    return null;
    }

const features = [
    {
    title: "Diseases detection",
    description: "Identify the possibles diseases of your plants.",
    icon: "fa-solid fa-leaf",
    image: "https://readdy.ai/api/search-image?query=close%20up%20of%20smartphone%20scanning%20a%20plant%20leaf%20with%20AI%20recognition%20interface%20overlay%2C%20soft%20natural%20lighting%2C%20minimalist%20clean%20background%2C%20photorealistic%20detailed%20image%20showing%20technology%20and%20nature&width=400&height=300&seq=4&orientation=landscape"
    },
    {
    title: "Watering Schedule",
    description: "Get personalized watering reminders based on your plant's species and environment.",
    icon: "fa-solid fa-droplet",
    image: "https://readdy.ai/api/search-image?query=digital%20calendar%20interface%20showing%20plant%20watering%20schedule%20with%20water%20droplet%20icons%2C%20clean%20modern%20design%2C%20soft%20natural%20lighting%2C%20minimalist%20background%2C%20photorealistic%20detailed%20image&width=400&height=300&seq=5&orientation=landscape"
    },
    {
    title: "Health Monitoring",
    description: "Track your plant's growth and health with detailed analytics and progress charts.",
    icon: "fa-solid fa-chart-line",
    image: "https://readdy.ai/api/search-image?query=digital%20dashboard%20showing%20plant%20health%20metrics%20with%20graphs%20and%20charts%2C%20modern%20interface%20design%2C%20soft%20natural%20lighting%2C%20minimalist%20background%2C%20photorealistic%20detailed%20image%20of%20plant%20monitoring%20technology&width=400&height=300&seq=6&orientation=landscape"
    },
    {
    title: "Expert Care Guides",
    description: "Access comprehensive care guides written by horticulture experts for every plant.",
    icon: "fa-solid fa-book-open",
    image: "https://readdy.ai/api/search-image?query=digital%20plant%20care%20guide%20with%20detailed%20illustrations%20and%20instructions%2C%20modern%20interface%20design%2C%20soft%20natural%20lighting%2C%20minimalist%20background%2C%20photorealistic%20detailed%20image%20of%20botanical%20information%20display&width=400&height=300&seq=7&orientation=landscape"
    }
];

const steps = [
    {
    number: "01",
    title: "Log In to the App",
    description: "Log in to the app or create your account in seconds.",
    icon: "fa-solid fa-download"
    },
    {
    number: "02",
    title: "Add Your Plants",
    description: "Take a photo or search our database to add plants to your collection.",
    icon: "fa-solid fa-camera"
    },
    {
    number: "03",
    title: "Set Up Care Reminders",
    description: "Customize care schedules based on each plant's specific needs.",
    icon: "fa-solid fa-bell"
    },
    {
    number: "04",
    title: "Watch Them Thrive",
    description: "Monitor growth, get care tips, and enjoy healthier, happier plants.",
    icon: "fa-solid fa-seedling"
    }
];

return (
    <div className="min-h-screen bg-white">

    {/* Header */}
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="10%" viewBox="0 0 544 544">                    
                <path fill="#000000" opacity="1.000000" stroke="none" d=" M28.468658,545.000000   C20.189770,540.190125 18.859058,532.728027 18.866772,524.283264   C18.960863,421.292480 19.017075,318.301361 18.779449,215.311005   C18.754047,204.301682 22.224247,196.992386 31.655109,190.470825   C91.121819,149.348740 150.139893,107.577843 209.305573,66.020462   C228.393112,52.613571 247.569641,39.330833 266.528412,25.744263   C276.447998,18.635508 287.185974,18.585068 297.427582,25.402973   C363.712158,69.529037 430.236481,113.294930 496.683105,157.177612   C510.029541,165.991882 523.365967,174.821396 536.735840,183.600006   C541.114319,186.474884 543.388733,190.360855 543.386719,195.669113   C543.369751,240.934601 543.400635,286.200104 543.405823,331.465576   C543.413391,396.626953 543.318604,461.788635 543.540039,526.949280   C543.565552,534.448792 541.754822,540.311707 535.209045,544.740479   C366.312439,545.000000 197.624878,545.000000 28.468658,545.000000  M242.713760,282.221039   C236.518555,288.962555 230.334961,295.714783 224.125885,302.443451   C208.090912,319.820221 192.076126,337.215881 175.962570,354.519531   C173.977371,356.651337 173.282944,358.858093 173.286392,361.689789   C173.346497,411.012787 173.399689,460.336090 173.238205,509.658630   C173.221954,514.625000 174.943298,515.789429 179.595490,515.785339   C287.403748,515.690735 395.212158,515.729309 503.020538,515.727539   C510.080444,515.727417 510.646271,515.110291 510.646545,507.974701   C510.650269,408.995300 510.604584,310.015808 510.764313,211.036652   C510.773468,205.373474 508.975372,201.952866 504.238403,198.878296   C476.296661,180.742432 448.528290,162.339050 420.729889,143.982849   C376.393372,114.705963 332.052216,85.435890 287.799927,56.032139   C283.700775,53.308437 280.657104,53.476082 276.670715,56.314129   C249.804855,75.440742 222.790329,94.358696 195.808472,113.322205   C149.615372,145.787842 103.429161,178.263412 57.174534,210.641220   C53.701805,213.072083 52.217747,215.710007 52.250698,220.095520   C52.548611,259.748474 52.705357,299.403290 52.695915,339.057526   C52.682503,395.374481 52.491329,451.691376 52.381939,508.008301   C52.368492,514.931458 53.172054,515.721436 60.154583,515.722107   C84.315086,515.724243 108.475601,515.726685 132.636093,515.713074   C139.666519,515.709106 139.732346,515.641541 139.732468,508.868744   C139.733368,460.379150 139.727982,411.889587 139.706482,363.399994   C139.705750,361.741730 139.811554,359.996796 139.358780,358.440308   C137.410797,351.743683 139.704391,346.593689 144.312088,341.708435   C158.251114,326.929749 171.948807,311.923615 185.762787,297.026764   C206.033569,275.166962 226.328659,253.329727 246.598114,231.468704   C248.799576,229.094406 251.336594,227.376923 254.465179,226.395874   C261.992798,224.035416 270.793823,226.570923 274.657776,232.357758   C278.537170,238.167786 277.263062,245.121826 271.118744,251.723480   C261.815399,261.719238 252.516098,271.718719 242.713760,282.221039  z"/>
                <path fill="#13810B" opacity="1.000000" stroke="none" d=" M238.793610,313.812775   C256.142334,294.895752 273.349396,276.328827 290.323578,257.551422   C293.373962,254.176971 295.335846,254.144196 298.786591,256.991333   C319.599701,274.163788 331.597656,295.471375 329.167480,323.055145   C327.455353,342.488647 317.451691,357.679657 301.477600,368.441162   C275.378357,386.023956 247.123505,387.319122 217.844116,377.831787   C210.847687,375.564728 204.293274,372.251465 197.987717,368.488007   C192.248917,365.062805 192.261154,364.630890 196.714584,359.778595   C210.680618,344.561707 224.621613,329.321838 238.793610,313.812775  z"/>
            </svg>

            <span className="text-xl font-bold text-gray-900">Plant Care</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:primary font-medium cursor-pointer">Home</a>
            <a href="#features" className="text-gray-700 hover:primary font-medium cursor-pointer">Features</a>
            {/* <a href="#pricing" className="text-gray-700 hover:primary font-medium cursor-pointer">Pricing</a> */}
            <a href="#about" className="text-gray-700 hover:primary font-medium cursor-pointer">About Us</a>
        </nav>
        
        {!session ? (

            <div className="flex items-center space-x-4">
                <Button className="bg-primary hover:bg-secondary !rounded-button whitespace-nowrap cursor-pointer" onClick={() => router.push('/signin')}>Log In</Button>
                <Button className="bg-secondary hover:bg-[#D5E4D1] !rounded-button whitespace-nowrap cursor-pointer" onClick={() => router.push('/signup')}>Sign Up</Button>
            </div>
            
            ) : (
            <div className="flex items-center space-x-2">
                <p>Hello {session.user?.name}</p>
                <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer" onClick={() => signOut()}>Log Out</Button>
            </div>
            )}

        
        </div>
    </header>

    {/* Hero Section */}
    <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#bfd4bdb3] to-transparent z-10"></div>
        <Image 
            src="https://readdy.ai/api/search-image?query=beautiful%20modern%20living%20room%20with%20various%20healthy%20indoor%20plants%2C%20soft%20natural%20lighting%20coming%20through%20large%20windows%2C%20minimalist%20interior%20design%20with%20white%20walls%20and%20wooden%20accents%2C%20bright%20airy%20space%20with%20lush%20greenery%2C%20professional%20interior%20photography&width=1440&height=800&seq=8&orientation=landscape" 
            alt="Plant Care Hero" 
            width={1440}
            height={800}
            className="w-full h-full object-cover object-top"
        />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            <Badge className="mb-4 bg-secondary text-white hover:bg-primary cursor-pointer">Beta version</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Care for Your Plants Like Never Before
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
                The smart companion that helps you nurture your plants with personalized care schedules, expert advice, and advanced health monitoring.
            </p>
            <div className="flex flex-wrap gap-4">
                <Button className="bg-primary hover:secondary text-white px-8 py-6 text-lg !rounded-button whitespace-nowrap cursor-pointer" onClick={() => signIn('credentials', { callbackUrl: '/home' })}>
                Get Started Free
                </Button>
            </div>
            </div>
            <div className="hidden md:block">
            {/* This div is intentionally empty as the background image serves as the right side content */}
            </div>
        </div>
        </div>
    </section>


    {/* Features Section */}
    <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-white hover:bg-primary cursor-pointer">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need for Plant Care</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of tools makes plant care simple, effective, and enjoyable for everyone from beginners to experts.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                <div className="aspect-video w-full overflow-hidden">
                    <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    width={400}
                    height={300}
                    className="w-full h-full object-cover object-top transition-transform hover:scale-105"
                    />
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <i className={`${feature.icon} text-emerald-500 text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    </section>

    {/* How It Works Section */}
    <section className="py-20 bg-[#aacca680]">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-white hover:bg-primary cursor-pointer">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Steps to Healthier Plants</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and see results in days with our easy-to-follow process.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-6">
                <i className={`${step.icon} text-emerald-500`}></i>
                </div>
                <div className="text-5xl font-bold text-secondary mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
            </div>
            ))}
        </div>
        </div>
    </section>

    {/* App Screenshot Section */}
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-white hover:bg-primary cursor-pointer">App Preview</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See Plant Care in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our intuitive interface designed to make plant care effortless and enjoyable.
            </p>
        </div>

        <div className="bg-gradient-to-r from-[#aacca680] to-[#c2d8c080] p-8 md:p-16 rounded-2xl overflow-hidden">
            <div className="max-w-5xl mx-auto">
            <Image 
                src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20plant%20care%20app%20interface%20with%20clean%20design%2C%20showing%20plant%20monitoring%20dashboard%20with%20health%20metrics%2C%20watering%20schedules%2C%20and%20plant%20identification%20features%2C%20high%20quality%20UI%20design%20mockup%20on%20gradient%20background&width=1000&height=600&seq=20&orientation=landscape" 
                alt="Plant Care App Interface" 
                width={1000}
                height={600}
                className="w-full h-auto rounded-lg shadow-xl border border-gray-200"
            />
            </div>
        </div>
        </div>
    </section>

    {/* Pricing Section */}
    {/* <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-white hover:bg-primary cursor-pointer">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your plant care needs.
            </p>
        </div>

        <Tabs defaultValue="monthly" className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
            <TabsList className="bg-emerald-50">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-white cursor-pointer">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-white cursor-pointer">Yearly (Save 20%)</TabsTrigger>
            </TabsList>
            </div>

            <TabsContent value="monthly" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                    <p className="text-gray-600 mb-4">Perfect for beginners</p>
                    <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Up to 5 plants</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Basic care reminders</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Plant identification (3/month)</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                        <i className="fa-solid fa-xmark mr-2"></i>
                        <span>Advanced health monitoring</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                        <i className="fa-solid fa-xmark mr-2"></i>
                        <span>Expert care guides</span>
                    </li>
                    </ul>
                    <Button variant="outline" className="w-full !rounded-button whitespace-nowrap cursor-pointer">Get Started</Button>
                </CardContent>
                </Card>

                <Card className="border-2 border-emerald-500 shadow-md hover:shadow-lg transition-shadow relative cursor-pointer">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">Popular</div>
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                    <p className="text-gray-600 mb-4">For dedicated plant parents</p>
                    <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$4.99</span>
                    <span className="text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Unlimited plants</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Advanced care schedules</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Unlimited plant identification</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Basic health monitoring</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Standard care guides</span>
                    </li>
                    </ul>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 !rounded-button whitespace-nowrap cursor-pointer">Get Premium</Button>
                </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                    <p className="text-gray-600 mb-4">For serious enthusiasts</p>
                    <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$9.99</span>
                    <span className="text-gray-500">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Everything in Premium</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Advanced health analytics</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">One-on-one expert consultations</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Priority support</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Early access to new features</span>
                    </li>
                    </ul>
                    <Button variant="outline" className="w-full !rounded-button whitespace-nowrap cursor-pointer">Get Pro</Button>
                </CardContent>
                </Card>
            </div>
            </TabsContent>

            <TabsContent value="yearly" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                    <p className="text-gray-600 mb-4">Perfect for beginners</p>
                    <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-500">/year</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Up to 5 plants</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Basic care reminders</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Plant identification (3/month)</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                        <i className="fa-solid fa-xmark mr-2"></i>
                        <span>Advanced health monitoring</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                        <i className="fa-solid fa-xmark mr-2"></i>
                        <span>Expert care guides</span>
                    </li>
                    </ul>
                    <Button variant="outline" className="w-full !rounded-button whitespace-nowrap cursor-pointer">Get Started</Button>
                </CardContent>
                </Card>

                <Card className="border-2 border-emerald-500 shadow-md hover:shadow-lg transition-shadow relative cursor-pointer">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">Popular</div>
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                    <p className="text-gray-600 mb-4">For dedicated plant parents</p>
                    <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$47.88</span>
                    <span className="text-gray-500">/year</span>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full inline-block mb-6">
                    Save $12 yearly
                    </div>
                    <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Unlimited plants</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Advanced care schedules</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Unlimited plant identification</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Basic health monitoring</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Standard care guides</span>
                    </li>
                    </ul>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 !rounded-button whitespace-nowrap cursor-pointer">Get Premium</Button>
                </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                    <p className="text-gray-600 mb-4">For serious enthusiasts</p>
                    <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$95.88</span>
                    <span className="text-gray-500">/year</span>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full inline-block mb-6">
                    Save $24 yearly
                    </div>
                    <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Everything in Premium</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Advanced health analytics</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">One-on-one expert consultations</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Priority support</span>
                    </li>
                    <li className="flex items-center">
                        <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                        <span className="text-gray-600">Early access to new features</span>
                    </li>
                    </ul>
                    <Button variant="outline" className="w-full !rounded-button whitespace-nowrap cursor-pointer">Get Pro</Button>
                </CardContent>
                </Card>
            </div>
            </TabsContent>
        </Tabs>
        </div>
    </section> */}

    {/* FAQ Section */}
    {/* <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-white hover:bg-primary cursor-pointer">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Plant Care and how it can help you.
            </p>
        </div>

        <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
            {[
                {
                question: "How accurate is the plant identification feature?",
                answer: "Our plant identification technology has a 95% accuracy rate for over 10,000 plant species. It uses advanced AI and machine learning algorithms trained on millions of plant images to provide accurate results even from partial leaf or flower photos."
                },
                {
                question: "Can I use Plant Care offline?",
                answer: "Yes! While some features like plant identification require an internet connection, core features such as your plant collection, care schedules, and basic care guides are available offline once downloaded."
                },
                {
                question: "How do I set up customized care reminders?",
                answer: "After adding a plant to your collection, you can set up care reminders by tapping on the plant and selecting 'Care Schedule.' From there, you can customize watering, fertilizing, repotting, and other care tasks based on your plant's specific needs and your local climate."
                },
                {
                question: "Is my data secure?",
                answer: "Absolutely. We use industry-standard encryption to protect all your data. Your plant information is stored securely, and we never share your personal information with third parties without your explicit consent."
                },
                {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time through your account settings. If you cancel, you'll continue to have access to your premium features until the end of your current billing period."
                }
            ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:bg-emerald-50/30 transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    </section> */}

    {/* Newsletter Section */}
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Stay Updated with Plant Care Tips</h2>
            <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for expert advice, seasonal care guides, and app updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
                type="email" 
                placeholder="Enter your email" 
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-base"
            />
            <Button className="bg-emerald-500 hover:bg-emerald-600 !rounded-button whitespace-nowrap cursor-pointer">
                Subscribe
            </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
            We respect your privacy. Unsubscribe at any time.
            </p>
        </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
            <div className="flex items-center space-x-2 mb-6">
                <i className="fa-solid fa-leaf text-emerald-400 text-2xl"></i>
                <span className="text-xl font-bold text-white">Plant Care</span>
            </div>
            <p className="mb-6">
                The smart companion for plant lovers. Making plant care simple, effective, and enjoyable.
            </p>
            <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-facebook-f text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-twitter text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-instagram text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-pinterest text-lg"></i>
                </a>
            </div>
            </div>
            
            <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Home</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors cursor-pointer">Features</a></li>
                {/* <li><a href="#pricing" className="hover:text-emerald-400 transition-colors cursor-pointer">Pricing</a></li> */}
                <li><a href="#about" className="hover:text-emerald-400 transition-colors cursor-pointer">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Blog</a></li>
            </ul>
            </div>
            
            <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">FAQs</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Community</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Developers</a></li>
            </ul>
            </div>
            
            <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors cursor-pointer">GDPR Compliance</a></li>
            </ul>
            </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Plant Care. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-400 cursor-pointer">
                <i className="fa-brands fa-cc-visa text-2xl"></i>
                </div>
                <div className="flex items-center text-gray-400 cursor-pointer">
                <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                </div>
                <div className="flex items-center text-gray-400 cursor-pointer">
                <i className="fa-brands fa-cc-paypal text-2xl"></i>
                </div>
                <div className="flex items-center text-gray-400 cursor-pointer">
                <i className="fa-brands fa-cc-apple-pay text-2xl"></i>
                </div>
            </div>
            </div>
        </div>
        </div>
    </footer>
    </div>
);
}


