import useFetch from './UseFetch';
import BlogList from './BlogList';

const Home = () => {
    const { data: blogs, isLoading, error } = useFetch('http://localhost:8000/blogs')
    
    return ( 
        <div className="home">
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            {/* initially blogs is null (before useEffect functions return reponse)
            the conditional statement below will only execute the BlogList component when blog evaluates to true i.e. is not null
            which prevents an error occuring in the BlogList component where a map function cannot map null objects  */}
            {blogs && <BlogList blogs={blogs} title="All blogs" />}
        </div>
    );
}

export default Home;
