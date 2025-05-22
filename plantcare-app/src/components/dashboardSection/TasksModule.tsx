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
        <div className="w-full h-full flex items-center rounded-md p-3">
            <div className="w-[70%] h-full flex flex-col items-center m-1 shadow-inner bg-secondary bg-opacity-50 overflow-y-auto rounded-md p-3">
                {validTasks.length > 0 ? (
                    <ul className="flex flex-col items-center w-[95%]">
                        {validTasks.map((task) => (
                        <li key={task.id} className="w-full flex justify-center m-1">
                            <div className="w-full text-[0.8rem] flex justify-between items-center bg-[#ffffff] border border-primary rounded-md shadow-primaryShadow">
                            <div className="flex items-center">
                                <Image
                                src="/icons/droplet.svg"
                                alt="Droplet icon"
                                width={25}
                                height={25}
                                className="m-2"
                                />
                                <div className="flex flex-col">
                                <span className="leading-tight">
                                    <strong>{task.action}</strong> {task.plant?.model?.name}
                                </span>
                                <span
                                    className="leading-tight"
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
                    <span>No task</span>
                  </div>
                )}
            </div>
            <div className="flex flex-col justify-center items-center w-[30%] h-full m-1 ">
                <div className="flex flex-col justify-around items-center bg-primary text-white font-bold rounded-md w-[80%] h-[75%] m-2 pt-3 pb-3 whitespace-nowrap">
                    <span className="text-[0.8rem] ">Total tasks</span>
                    <span>{validTasks.length}</span>
                </div>
            </div>
        </div>
    )
}