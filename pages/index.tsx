import path from 'path';
import fs from 'fs/promises';

function HomePage(props: Props) {
    const { products } = props;

    return (
        <ul>
            {products?.map((product) => (
                <li key={product.id}>{product.title}</li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    console.log('(Re-)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(String(jsonData));

    return {
        props: {
            products: data.products,
        },
        // Greater number for static website
        //and lower numbers for dynamic website
        revalidate: 10,
    };
}

export default HomePage;

//################### Type #####################
type Props = {
    products: any[];
};
