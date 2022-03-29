//import {render} from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Trivia from './Trivia'

describe('Trivia Component', () => {

    //startBtn renders
    it("should start trivia", () => {
        render(<Trivia />)
        const startBtnElement = screen.getByRole("button", {
            name: /start/i
        })
        userEvent.click(startBtnElement)
        expect(startBtnElement).toBeTruthy()
    })

    //clicking start button opens Trivia component
    it("when click start it opens quiz", () => {
        render(<Trivia />)
        const startBtnElement = screen.getByRole("button")
        expect(startBtnElement).toBeTruthy()
    })    

})