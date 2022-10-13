import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient, ObjectId } from 'mongodb';
import { Meetup } from "../interfaces";
type Meetups = {
  meetups: Meetup[];
}
const Home = ({meetups}: Meetups) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://sagnick:rick1987@cluster0.hgh89.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        user: meetup.user
      })),
    },
    revalidate: 1,
  };
}

export default Home;
