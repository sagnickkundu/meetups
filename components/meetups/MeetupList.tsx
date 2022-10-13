import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import { Meetup } from '../../interfaces';

type Props = {
  meetups: Meetup[]
}

function MeetupList({meetups}: Props) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          user={meetup.user}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
