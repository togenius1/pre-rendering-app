import { GetServerSidePropsContext } from 'next';

function UserProfilePage(props: Props) {
    return <h1>{props.userName}</h1>;
}

// Not prepare in advance like getStaticProps
// But really for every incoming request.
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params, req, res } = context;

    return {
        props: {
            userName: 'Max',
        },
    };
}

export default UserProfilePage;

// ############### Type #######################
type Props = {
    userName: string | null;
};
