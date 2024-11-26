import client from '@/sanity/sanityClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from "./task-details.module.css";
import DeleteButton from './DeleteButton';

const TaskDetails = async ({ params }: TaskDetails) => {
  const taskId = (await (params)).taskId;

  const task = await client.fetch(`*[_type == "task" && _id == $taskId][0]`, { taskId }).catch((error) => {
    console.error('Error fetching task details:', error);
    return <p>Error fetching task details. Please try again later.</p>;
  });

  if (!task) {
    notFound();
  }

  return (
    <>
      <div className={styles.header}>
        <Link
          href="/task-list"
          className={styles.backButton}
        >
          ⬅
        </Link>
        <h1>Task Details</h1>
      </div>
      <div className={styles.task}>
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <span
          style={{
            padding: '5px 10px',
            borderRadius: '4px',
            backgroundColor:
              task.status === 'completed'
                ? 'green'
                : task.status === 'inprogress'
                  ? 'orange'
                  : 'gray',
            color: 'white',
            width: '200px',
            textAlign: 'center',
          }}
        >
          {task.status}
        </span>
        <div className={styles.buttons}>
          <Link
            href={`/task-list/${task._id}/edit`}
            className={styles.editButton}
          >
            Edit
          </Link>
          <DeleteButton taskId={task._id} />
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
