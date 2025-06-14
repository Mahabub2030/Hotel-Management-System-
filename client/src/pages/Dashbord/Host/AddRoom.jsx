import { useState } from "react";
import AddRoomForm from "../../../components/From/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUplode } from "../../../api/utils";

const AddRoom = () => {
    const {user} = useAuth()
  const [dates, setDate] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });
    
    // date range hanelaer
    const handelDates = (item) => {
      console.log(item);
      setDate(item.selection);
    };

    // form handler
    const handelerSubmit = async e => {
        e.preventDefault()

        const form = e.target
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = ''
        const from = ''
        const price = form.price.value
        const quests = form.total_quest.value
        const bathrooms = form.bathrooms.value
        const discription = form.discription.value
        const bedrooms = form.bedrooms.value
        const image = form.image.files[0]
        const host = {
          name: user?.displayName,
            image: user?.photoURL,
          email:user?.email
        };
            
        const imge_url = await imageUplode(image);
        console.log(imge_url)

    }



  return (
    <div>
      {/* from */}
      <AddRoomForm
        dates={dates}
        handelDates={handelDates}
        handelerSubmit={handelerSubmit}
      />
    </div>
  );
};

export default AddRoom;
