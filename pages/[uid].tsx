import { GetServerSidePropsContext } from 'next';

function UserIdPage(props: Props) {
    return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;

    const userId = params?.uid;

    return {
        props: {
            id: 'userid-' + userId,
        },
    };
}

export default UserIdPage;

//####################### Type ##############################
type Props = {
    id: string | null;
};
