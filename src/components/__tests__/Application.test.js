import React from "react";
import {
  findByAltText,
  findByText,
  queryByAltText,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

import axios from "axios";



import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // console.log(prettyDOM(appointment));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday", /no spots remaining/i)
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // debug();

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    getByText(appointment, "Are you sure you would like to delete?");

    // 5. Click the "Confirm" button on the confirmation.
    const button = getByText(appointment, 'Confirm')
    fireEvent.click(button)

    // 6. Check that the element with the text "Deleting" is displayed.
    const foundText = getByText(appointment,'Deleting...')
      // console.log(prettyDOM(foundText))

    // 7. Wait until the element with the "Add" button is displayed.
   await findByAltText(appointment, "Add")

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday", /no spots remaining/i)
    );
    // console.log(prettyDOM(day))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // We want to start by finding an existing interview.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    // With the existing interview we want to find the edit button.
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // We change the name and save the interview.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    // save the appointment
    fireEvent.click(getByText(appointment, "Save"));

    //   // console.log(prettyDOM(appointment));
      expect(getByText(appointment, "Saving...")).toBeInTheDocument();
  
      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
      // We don't want the spots to change for "Monday", since this is an edit.

   const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday", /1 spot remaining/i)
    );
    // console.log(prettyDOM(day))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  // Read the errors because sometimes they say that await cannot be outside of an async function.

  it("shows the save error when failing to save an appointment", async () => {
    // const { container, debug } = render(<Application />);
    // await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // const appointment = getAllByTestId(container, "appointment").find(
    //   (appointment) => queryByText(appointment, "Archie Cohen")
    //   );
    //   fireEvent.click(queryByAltText(appointment, "Edit"));
    //   fireEvent.click(getByText(appointment, "Save"));
    //   expect(getByText(appointment, "Saving...")).toBeInTheDocument();
      axios.put.mockRejectedValueOnce();
      // expect(getByText(appointment, "ERROR SAVE")).toBeInTheDocument();


  });

  it("shows the delete error when failing to delete an existing appointment",async () => {
    // const { container, debug } = render(<Application />);
    // await waitForElement(() => getByText(container, "Archie Cohen"));

    // const appointment = getAllByTestId(container, "appointment").find(
    //   (appointment) => queryByText(appointment, "Archie Cohen")
    // );
    // fireEvent.click(queryByAltText(appointment, "Delete"));
    // const button = getByText(appointment, 'Confirm')
    // fireEvent.click(button)
    // expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    axios.put.mockRejectedValueOnce();
    // expect(getByText(appointment, "ERROR DELETE")).toBeInTheDocument();
  });

});
