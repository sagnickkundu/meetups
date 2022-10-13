import classes from "./MeetupDetail.module.css";
type MeetupData = {
  title: string;
  image: string;
  address: string;
  description: string;
  user: string
};
const MeetupDetail = (props: MeetupData) => {
  return (
    <>
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.content}>
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <h4>Organized by {props.user}</h4>
        <p>{props.description}</p>
      </div>
      
    </>
  );
};

export default MeetupDetail;
