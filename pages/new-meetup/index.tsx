import Head from "next/head";
import { useRouter } from "next/router";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

type MeetupData = {
    title: string;
    image: string;
    address: string;
    description: string;
  };

export default withPageAuthRequired(function NewMeetUp ({user}) {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData: MeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      {user && <NewMeetupForm onAddMeetup={addMeetupHandler} user={user} />}
    </>
  );
});
