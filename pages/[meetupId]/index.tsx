import { MongoClient, ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

type MeetupData = {
  meetupData: {
    title: string;
    image: string;
    address: string;
    description: string;
    user: string;
  };
};
const MeetupDetails = (props: MeetupData) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        user={props.meetupData.user}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://sagnick:rick1987@cluster0.hgh89.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.distinct("_id", {});

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup.toString() },
    })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // fetch data for a single meetup

  const meetupId = params?.meetupId as string;

  const client = await MongoClient.connect(
    "mongodb+srv://sagnick:rick1987@cluster0.hgh89.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup!._id.toString(),
        title: selectedMeetup!.title,
        address: selectedMeetup!.address,
        image: selectedMeetup!.image,
        description: selectedMeetup!.description,
        user: selectedMeetup!.user,
      },
    },
  };
};

export default MeetupDetails;
