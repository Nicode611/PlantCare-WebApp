// Next
import Image from "next/image"
import { useEffect } from "react"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"

// session
import { useSession } from "next-auth/react"

// API
import { getAllTasksFromUser } from "@/lib/api/tasks"


export default function TasksModule() {

    // Session
    const { data: session } = useSession();
    
    // Get all tasks from user
    /* const [tasks, setTasks] = useState<Task[]>([]); */
    const tasks = useSelector((state: RootState) => state.tasks.value);
    const dispatch = useDispatch();

    
    useEffect(() => {
        const fetchTasks = async () => {
            if (!session?.user?.id) return; // guard against undefined
            const userId = session.user.id;
            const fetchedTasks = await getAllTasksFromUser(userId);
            dispatch({ type: "tasks/add", payload: fetchedTasks });
        };

        fetchTasks();
    }, [session?.user?.id, dispatch]); // now depends on user.id
    
    const validTasks = tasks.filter(task =>
      task.severityLvl === "M" || task.severityLvl === "H"
    );
    

    return (
        <div className="w-full h-full flex flex-col items-center rounded-md">
          <div className={`w-full flex items-center justify-start border-b border-gray-200 ${session?.user.theme === "light" ? "bg-white text-primary" : "bg-black text-white" }`}>
            <h3 className="text-2xl font-bold py-1 px-3">Tasks</h3>
          </div>
          <div className={`flex w-full h-full p-3 ${session?.user.theme === "light" ? "bg-[#F9FAFB]" : "bg-bgDarkSection" }`}>
            <div className={`w-[70%] h-full flex flex-col items-center shadow-inner ${session?.user.theme === "light" ? "bg-secondary" : "bg-white" } bg-opacity-50 overflow-y-auto rounded-md`}>
                {validTasks.length > 0 ? (
                    <ul className="flex flex-col items-center w-[95%]">
                        {validTasks.map((task) => (
                        <li key={task.id} className="w-full flex justify-center m-1">
                            <div className="w-full text-[0.8rem] flex justify-between items-center bg-[#ffffff] border border-primary rounded-md shadow-primaryShadow">
                            <div className="flex items-center">
                                <Image
                                src="/icons/droplet.svg"
                                alt="Droplet icon"
                                width={20}
                                height={20}
                                className="m-2"
                                />
                                <div className="flex flex-col">
                                <span className="leading-tight">
                                    <strong>{task.action}</strong> {task.plant?.model?.name}
                                </span>
                                <span
                                    className="leading-tight text-[0.6rem]"
                                    style={{
                                      color:
                                        task.severityLvl === "M"
                                          ? "orange"
                                          : task.severityLvl === "L"
                                          ? "green"
                                          : "red",
                                    }}
                                >
                                    {new Date(task.dateOfAction).toLocaleDateString()}
                                </span>
                                </div>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <span className={`${session?.user.theme === "light" ? "text-primary" : " text-white" }`}>No task</span>
                  </div>
                )}
            </div>
            <div className="flex flex-col justify-center items-center w-[30%] h-full m-1 ">
                <div className={`flex flex-col justify-around items-center  bg-primary text-white font-bold rounded-md w-[80%] h-[75%] m-2 pt-3 pb-3 whitespace-nowrap`}>
                    <span className="text-[0.8rem] ">Total tasks</span>
                    <span>{validTasks.length}</span>
                </div>
            </div>
          </div>
        </div>
    )
}