import React from "react";
import { Form, redirect, Link, useParams, useNavigate } from "react-router-dom";
// const navigate = useNavigate();
import { useState } from "react";

export async function action({ request, params }) {
    let formData = await request.formData();
    let bathroomData = Object.fromEntries(formData);

    // -- ADD USER ID FROM SESSION WHEN AUTH CONTEXT WORK --
    //create review
    const response = await fetch(`/api/userActions/${params.id}/reviews`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bathroomData),
    });
    console.log("review call response:", response);
    //edit bathroom rating
    const updateresponse = await fetch(`/api/bathroomActions/bathroomsrating/${params.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bathroomData),
    });

    console.log("hannaaaaaaaaaah" + updateresponse);

    return redirect(`/bathrooms/${params.id}`);

}

export default function AddReviewForm() {

    const { id } = useParams();
    const [rating, setRating] = useState(0);

    const handleRating = (star) => {
        setRating(star);
    };


    const handleSubmit = (event) => {
        const rating = event.target.rating.value;

        if (!rating) {
            alert("Please provide a rating before submitting.");
            event.preventDefault(); // Prevent form submission
        } else if (rating < 0 || rating > 5) {
            alert("Rating should be between 0 and 5.");
            event.preventDefault(); // Prevent form submission
        }
    };
    return (

        <Form method="post" className="p-8 bg-sky-100 text-black rounded" onSubmit={handleSubmit}>
            <Link to={`/bathrooms/${id}`} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-stone-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Back
            </Link>
            <h1 className="text-5xl font-bold text-center mb-8 tracking-widest text-sky-950">Create Review</h1>

            <fieldset>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-center items-center  ">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{ fontSize: "60px", margin: "0 5px", cursor: "pointer", color: rating >= star ? "gold" : "gray" }}
                                className={`star ${rating >= star ? "filled" : ""}`}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <input type="hidden" id="rating" name="rating" value={rating} />
                </div>
            </fieldset>


            <fieldset>
                <div className="flex flex-col gap-4 mb-4">
                    <textarea
                        id="content"
                        name="content"
                        className="border-2 border-blue-500 p-2 rounded bg-sky-950 text-stone-200"
                        rows="4"
                        placeholder="Enter your review here"
                    />
                </div>
            </fieldset>

        
            <div className="grid grid-cols-2 gap-4"> 
            
              <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                <p className="text-lg font-semibold mb-2">Is it wheelchair accessible?</p>
                <div className="flex items-center space-x-4">
                    <input type="radio" id="wheelchairYes" name="wheelchair" value="1" />
                    <label htmlFor="wheelchairYes" className="mr-4">Yes</label>

                    <input type="radio" id="wheelchairNo" name="wheelchair" value="0" />
                    <label htmlFor="wheelchairNo" className="mr-4">No</label>

                    <input type="radio" id="wheelchairUnknown" name="wheelchair" value="3" defaultChecked />
                    <label htmlFor="wheelchairUnknown">Unknown</label>
                </div>
            </fieldset>
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is it Unisex?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="unisexYes" name="unisex" value="1" />
                        <label htmlFor="unisexYes" className="mr-4">Yes</label>

                        <input type="radio" id="unisexNo" name="unisex" value="0" />
                        <label htmlFor="unisexNo" className="mr-4">No</label>

                        <input type="radio" id="unisexUnknown" name="unisex" value="3" defaultChecked />
                        <label htmlFor="unisexUnknown">Unknown</label>
                    </div>
                </fieldset>


                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have an Emergency Cord?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="emergencyCordYes" name="emergencyCord" value="1" />
                        <label htmlFor="emergencyCordYes" className="mr-4">Yes</label>

                        <input type="radio" id="emergencyCordNo" name="emergencyCord" value="0" />
                        <label htmlFor="emergencyCordNo" className="mr-4">No</label>

                        <input type="radio" id="emergencyCordUnknown" name="emergencyCord" value="3" defaultChecked />
                        <label htmlFor="emergencyCordUnknown">Unknown</label>
                    </div>
                </fieldset>


                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have an Emergency Button?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="emergencyButtonYes" name="emergencyButton" value="1" />
                        <label htmlFor="emergencyButtonYes" className="mr-4">Yes</label>

                        <input type="radio" id="emergencyButtonNo" name="emergencyButton" value="0" />
                        <label htmlFor="emergencyButtonNo" className="mr-4">No</label>

                        <input type="radio" id="emergencyButtonUnknown" name="emergencyButton" value="3" defaultChecked />
                        <label htmlFor="emergencyButtonUnknown">Unknown</label>
                    </div>
                </fieldset>


                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is it Pet Friendly?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="petFriendlyYes" name="petFriendly" value="1" />
                        <label htmlFor="petFriendlyYes" className="mr-4">Yes</label>

                        <input type="radio" id="petFriendlyNo" name="petFriendly" value="0" />
                        <label htmlFor="petFriendlyNo" className="mr-4">No</label>

                        <input type="radio" id="petFriendlyUnknown" name="petFriendly" value="3" defaultChecked />
                        <label htmlFor="petFriendlyUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it require a key?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="requiresKeyYes" name="requiresKey" value="1" />
                        <label htmlFor="requiresKeyYes" className="mr-4">Yes</label>

                        <input type="radio" id="requiresKeyNo" name="requiresKey" value="0" />
                        <label htmlFor="requiresKeyNo" className="mr-4">No</label>

                        <input type="radio" id="requiresKeyUnknown" name="requiresKey" value="3" defaultChecked />
                        <label htmlFor="requiresKeyUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have a hand dryer?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="handDryerYes" name="handDryer" value="1" />
                        <label htmlFor="handDryerYes" className="mr-4">Yes</label>

                        <input type="radio" id="handDryerNo" name="handDryer" value="0" />
                        <label htmlFor="handDryerNo" className="mr-4">No</label>

                        <input type="radio" id="handDryerUnknown" name="handDryer" value="3" defaultChecked />
                        <label htmlFor="handDryerUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have feminine products?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="feminineProductsYes" name="feminineProducts" value="1" />
                        <label htmlFor="feminineProductsYes" className="mr-4">Yes</label>

                        <input type="radio" id="feminineProductsNo" name="feminineProducts" value="0" />
                        <label htmlFor="feminineProductsNo" className="mr-4">No</label>

                        <input type="radio" id="feminineProductsUnknown" name="feminineProducts" value="3" defaultChecked />
                        <label htmlFor="feminineProductsUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // For toilet covers */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have toilet covers?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="toiletCoversYes" name="toiletCovers" value="1" />
                        <label htmlFor="toiletCoversYes" className="mr-4">Yes</label>

                        <input type="radio" id="toiletCoversNo" name="toiletCovers" value="0" />
                        <label htmlFor="toiletCoversNo" className="mr-4">No</label>

                        <input type="radio" id="toiletCoversUnknown" name="toiletCovers" value="3" defaultChecked />
                        <label htmlFor="toiletCoversUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // For bidet */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have a bidet?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="bidetYes" name="bidet" value="1" />
                        <label htmlFor="bidetYes" className="mr-4">Yes</label>

                        <input type="radio" id="bidetNo" name="bidet" value="0" />
                        <label htmlFor="bidetNo" className="mr-4">No</label>

                        <input type="radio" id="bidetUnknown" name="bidet" value="3" defaultChecked />
                        <label htmlFor="bidetUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // For single stall */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is it a single stall restroom?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="singleStallYes" name="singleStall" value="1" />
                        <label htmlFor="singleStallYes" className="mr-4">Yes</label>

                        <input type="radio" id="singleStallNo" name="singleStall" value="0" />
                        <label htmlFor="singleStallNo" className="mr-4">No</label>

                        <input type="radio" id="singleStallUnknown" name="singleStall" value="3" defaultChecked />
                        <label htmlFor="singleStallUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // Is it a multiple stall restroom? */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is it a multiple stall restroom?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="multipleStallYes" name="multipleStall" value="1" />
                        <label htmlFor="multipleStallYes" className="mr-4">Yes</label>

                        <input type="radio" id="multipleStallNo" name="multipleStall" value="0" />
                        <label htmlFor="multipleStallNo" className="mr-4">No</label>

                        <input type="radio" id="multipleStallUnknown" name="multipleStall" value="3" defaultChecked />
                        <label htmlFor="multipleStallUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // Does it have a changing table? */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have a changing table?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="changingTableYes" name="changingTable" value="1" />
                        <label htmlFor="changingTableYes" className="mr-4">Yes</label>

                        <input type="radio" id="changingTableNo" name="changingTable" value="0" />
                        <label htmlFor="changingTableNo" className="mr-4">No</label>

                        <input type="radio" id="changingTableUnknown" name="changingTable" value="3" defaultChecked />
                        <label htmlFor="changingTableUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // Does it have a trash can? */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have a trash can?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="trashCanYes" name="trashCan" value="1" />
                        <label htmlFor="trashCanYes" className="mr-4">Yes</label>

                        <input type="radio" id="trashCanNo" name="trashCan" value="0" />
                        <label htmlFor="trashCanNo" className="mr-4">No</label>

                        <input type="radio" id="trashCanUnknown" name="trashCan" value="3" defaultChecked />
                        <label htmlFor="trashCanUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* Good Flooring */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have good flooring?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="goodFlooringYes" name="goodFlooring" value="1" />
                        <label htmlFor="goodFlooringYes" className="mr-4">Yes</label>

                        <input type="radio" id="goodFlooringNo" name="goodFlooring" value="0" />
                        <label htmlFor="goodFlooringNo" className="mr-4">No</label>

                        <input type="radio" id="goodFlooringUnknown" name="goodFlooring" value="3" defaultChecked />
                        <label htmlFor="goodFlooringUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* Air Freshener */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is there an air freshener?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="airFreshenerYes" name="airFreshener" value="1" />
                        <label htmlFor="airFreshenerYes" className="mr-4">Yes</label>

                        <input type="radio" id="airFreshenerNo" name="airFreshener" value="0" />
                        <label htmlFor="airFreshenerNo" className="mr-4">No</label>

                        <input type="radio" id="airFreshenerUnknown" name="airFreshener" value="3" defaultChecked />
                        <label htmlFor="airFreshenerUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* Automatic */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is the restroom automatic (e.g., automatic flush, faucet)?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="automaticYes" name="automatic" value="1" />
                        <label htmlFor="automaticYes" className="mr-4">Yes</label>

                        <input type="radio" id="automaticNo" name="automatic" value="0" />
                        <label htmlFor="automaticNo" className="mr-4">No</label>

                        <input type="radio" id="automaticUnknown" name="automatic" value="3" defaultChecked />
                        <label htmlFor="automaticUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // Does it have a coat hook? */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have a coat hook?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="coatHookYes" name="coatHook" value="1" />
                        <label htmlFor="coatHookYes" className="mr-4">Yes</label>

                        <input type="radio" id="coatHookNo" name="coatHook" value="0" />
                        <label htmlFor="coatHookNo" className="mr-4">No</label>

                        <input type="radio" id="coatHookUnknown" name="coatHook" value="3" defaultChecked />
                        <label htmlFor="coatHookUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // Does it have a braille sign? */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have a braille sign?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="brailleSignYes" name="brailleSign" value="1" />
                        <label htmlFor="brailleSignYes" className="mr-4">Yes</label>

                        <input type="radio" id="brailleSignNo" name="brailleSign" value="0" />
                        <label htmlFor="brailleSignNo" className="mr-4">No</label>

                        <input type="radio" id="brailleSignUnknown" name="brailleSign" value="3" defaultChecked />
                        <label htmlFor="brailleSignUnknown">Unknown</label>
                    </div>
                </fieldset>

                {/* // Does it have hot water? */}
                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Does it have hot water?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="hotWaterYes" name="hotWater" value="1" />
                        <label htmlFor="hotWaterYes" className="mr-4">Yes</label>

                        <input type="radio" id="hotWaterNo" name="hotWater" value="0" />
                        <label htmlFor="hotWaterNo" className="mr-4">No</label>

                        <input type="radio" id="hotWaterUnknown" name="hotWater" value="3" defaultChecked />
                        <label htmlFor="hotWaterUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is there a first aid kit available?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="firstAidYes" name="firstAid" value="1" />
                        <label htmlFor="firstAidYes" className="mr-4">Yes</label>

                        <input type="radio" id="firstAidNo" name="firstAid" value="0" />
                        <label htmlFor="firstAidNo" className="mr-4">No</label>

                        <input type="radio" id="firstAidUnknown" name="firstAid" value="3" defaultChecked />
                        <label htmlFor="firstAidUnknown">Unknown</label>
                    </div>
                </fieldset>

                <fieldset className="mb-8 p-6 border rounded-lg shad bg-stone-100 text-cyan-950">
                    <p className="text-lg font-semibold mb-2">Is there a sharps disposal available?</p>
                    <div className="flex items-center space-x-4">
                        <input type="radio" id="sharpsDisposalYes" name="sharpsDisposal" value="1" />
                        <label htmlFor="sharpsDisposalYes" className="mr-4">Yes</label>

                        <input type="radio" id="sharpsDisposalNo" name="sharpsDisposal" value="0" />
                        <label htmlFor="sharpsDisposalNo" className="mr-4">No</label>

                        <input type="radio" id="sharpsDisposalUnknown" name="sharpsDisposal" value="3" defaultChecked />
                        <label htmlFor="sharpsDisposalUnknown">Unknown</label>
                    </div>
                </fieldset>
            </div>

            <button
                type="submit"
                className="bg-sky-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full"
            >
                Submit Review
            </button>
        </Form>
    );
}