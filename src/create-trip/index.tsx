import { useEffect, useState } from "react";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "../hooks/use-toast";
import { chatSession } from "../service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface FormData {
  location: string;
  days: number;
  budget: string;
  travelWith: string;
}

function CreateTrip() {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    days: 0,
    budget: "",
    travelWith: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name: keyof FormData, value: string | number) => {
    if (name === "days" && typeof value === "number" && value > 5) {
      toast({
        description: "Number of days cannot exceed 5.",
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    const { location, days, budget, travelWith } = formData;
    if (!location || !days || !budget || !travelWith) {
      toast({
        description: "Please fill all the details.",
      });
      return;
    }
    setLoading(true);

    const prompt = AI_PROMPT
      .replace("{location}", location)
      .replace("{days}", days.toString())
      .replace("{budget}", budget)
      .replace("{travelWith}", travelWith);

    console.log("Generated Prompt:", prompt);

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log("AI Response:", responseText);
      saveAiTrip(responseText);
    } catch (error) {
      console.error("Error sending AI prompt:", error);
      toast({
        description: "An error occurred while generating your trip. Please try again.",
      });
      setLoading(false);
    }
  };

  const saveAiTrip = async (tripData: string) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTour", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docId,
    });

    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const getUserProfile = (tokenInfo: any) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="lg:mx-72 m-8 py-10">
      <h2 className="text-3xl py-2 font-bold">
        Tell us your travel preferences 🌍✈️🌴
      </h2>
      <p className="text-xl text-gray-500">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Rewa, Madhya Pradesh, India"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        {/* Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            type="number"
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="2"
            value={formData.days || ""}
            onChange={(e) => handleInputChange("days", Number(e.target.value))}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleInputChange("budget", item.title)}
                className={`border cursor-pointer p-4 rounded-lg hover:shadow-lg ${
                  formData.budget === item.title && "border-black shadow-lg"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleInputChange("travelWith", item.people || "")}
                className={`border cursor-pointer p-4 rounded-lg hover:shadow-lg ${
                  formData.travelWith === item.people && "border-black shadow-lg"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="float-right" disabled={loading} onClick={onGenerateTrip}>
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin h-7 w-7" />
        ) : (
          "Generate Trip"
        )}
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription asChild>
              <div className="flex flex-col">
                <img src="/logo.svg" alt="App Logo" className="w-48 pb-4" />
                <h2 className="font-bold text-lg">Sign in with Google</h2>
                <p className="pb-4 text-md">
                  Sign In to the App with Google authentication securely
                </p>
                <Button onClick={login}>
                  <FcGoogle />
                  Sign in to Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
