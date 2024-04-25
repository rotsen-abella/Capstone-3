import Banner from '../components/Banner';


export default function Home() {

	const data = {
	    title: "THE SHOP",
	    content: "Shop to your heart's content!",
	    destination: "/home",
	    label: "Shop now!"
	}

	return(
		<>
			<Banner data={data}/>
			
		</>
	)
}