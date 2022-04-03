import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Trivia from './../pages/Trivia'
import Questions from './../components/Questions'
//import * as APIService from './../API'


//test
// describe('is working', () => {
//     it('should work', () => {
//         expect(true).toBeTruthy();
//     })
// })

describe('Trivia Game', () => {
    describe('ScreenName Welcome', () => {
        render(<Trivia />)
        it('should display name entered in input', () => {
            
            //works
            //render(<Trivia/>)
            // const input = screen.getByLabelText(/Screen Name/i) as HTMLInputElement
            // fireEvent.change(input, { target: { value: 'test' } })
            // expect(input.value).toBe('test')

            //works
            const input = screen.getByLabelText(/Screen Name/i) as HTMLInputElement
            userEvent.type(input, 'test')
            expect(input.value).toBe('test')            
        })
    })

    // describe('Start Trivia', () => {
    //     jest.mock('./../pages/Trivia')
    //     it('should make an api call', async() => {
    //         APIService.getData().mockResolveValueOnce({ok : true})
    //     })
    // })    
})

// describe('Trivia Component', () => {

//     //startBtn renders
//     it("should render the text", () => {
//         render(<Trivia />)  //1. renders component we want to test
//         const headingElement = screen.getByText(/cats/)
//         // , {
//         //     name: "Trivia Quiz"  //2. find element to test
//         // })
//         expect(headingElement).toBeInTheDocument()  //4. assert results as expected
//     })
    
// //    it("should start trivia", () => {
//         // render(<Trivia />)  //1. renders component we want to test
//         // const buttonElement = screen.getByRole("button", {
//         //     name: /start/i  //2. find element to test
//         // })
//         // userEvent.click(buttonElement)  //3. interact with element
//         // expect(buttonElement.length).toBe(1)  //4. assert results as expected    
// //    })
// })