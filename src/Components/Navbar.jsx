import Button from "../Components/Button";
function Navbar() {
  return (
    <div className="bg-black ">
      <div className="container mx-auto py-8">
        <div className="flex justify-around items-center">
          {/* <Button text="Forecast" color="green"  /> */}
          <Button text="Forcast For Next 5 Days" color="blue" />
          <Button text="Latest News" color="red" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
