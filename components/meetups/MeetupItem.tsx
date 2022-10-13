import Image from 'next/image';
import { useRouter } from 'next/router';
import { Meetup } from '../../interfaces';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props: Meetup) {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/"+props.id);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>Organized by {props.user}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
