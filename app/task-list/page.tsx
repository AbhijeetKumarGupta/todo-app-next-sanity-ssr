import client from '@/sanity/sanityClient';
import Link from 'next/link';

import styles from "./task-list.module.css";

export const dynamic = "force-dynamic";

const TaskList = async () => {
    const tasks = await client.fetch('*[_type == "task"]').catch((error) => {
        console.error('Error fetching tasks:', error);
        return <p>Error fetching tasks. Please try again later.</p>;
    });
    
    return (
        <div>
            <div className={styles.header}>
                <Link
                    href="/"
                    className={styles.backButton}
                >
                    ⬅
                </Link>
                <h1>Task List</h1>
            </div>
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <ol style={{marginTop: 20}}>
                    {tasks.map((task: Task) => (
                        <Link href={`/task-list/${task._id}`} key={task._id} className={styles.task}>
                            <li>
                                <h3>{task.name}</h3>
                            </li>
                        </Link>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default TaskList;
