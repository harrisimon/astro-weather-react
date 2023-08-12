// create a custom loading component of a ball bouncing back and forth
//
// 1. create a new component called Loading.tsx

// 2. import React and CSS
// 3. create a functional component called Loading
// 4. return a div with a class of loading
// 5. add a p tag with the text "Loading..."
// 6. export the component
// 7. import the component into App.tsx
// 8. add a new state variable called loading
// 9. set the initial value to true
// 10. add a conditional to the return statement
// 11. if loading is true, render the Loading component
// 12. if loading is false, render the Table component
// 13. add a button to the return statement
// 14. add an onClick handler to the button
// 15. create a function called toggleLoading
// 16. set the loading state to the opposite of its current value
// 17. pass the toggleLoading function to the onClick handler

const Loading = () => {
    return (
        <div className="loading">
            {/* make a ball bounce back and forth */}
            <div className="ball"></div>

            <p>Loading...</p>
        </div>
    )
}

export default Loading
