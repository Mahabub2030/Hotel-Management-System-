import { useState } from "react";
import AddRoomForm from "../../../components/From/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUplode } from "../../../api/utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const axiosSecure = useAxiosSecure()
  const [loading,setLoading] = useState(false)
  const { user } = useAuth();
   const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

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
  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post(`/room`, roomData)
      return data
    },
    onSuccess: () => {
      console.log('Data saved Successfully')
      toast.success('Room added succesfully')
      navigate("/dashboard/my-listings");
      setLoading(false);
    }
  })


  // form handler
  //   Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const bedrooms = form.bedrooms.value;
    const image = form.image.files[0];

    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const image_url = await imageUplode(image);
      const roomData = {
        location,
        category,
        title,
        to,
        from,
        price,
        guests,
        bathrooms,
        bedrooms,
        host,
        description,
        image: image_url,
      };
      console.table(roomData);
      // post request to sever 
      await mutateAsync(roomData)



    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };
  //   handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <div>
      {/* from */}
      <AddRoomForm
        dates={dates}
        handelDates={handelDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default AddRoom;
