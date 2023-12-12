import Notes from "./Notes";

function Home() {

  return (
    <>
    <div className='container mx-auto p-4 max-w-screen-xl'>       
        <h2 className="text-3xl font-extrabold dark:text-black">Add a note</h2>
        
        <input type="text" placeholder="Type here" className="my-2 input input-bordered input-primary w-full max-w-xs" />
        
        <button type="Submit" class="btn btn-primary flex justify-between my-2">Primary</button>
        
    </div>
    <Notes/>
    </>
  )
}

export default Home;