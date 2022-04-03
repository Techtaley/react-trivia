//explicit types for incoming props 
type Props = {
    handleSubmit: any,
    screenName: string,
    handleChange: any,
    gameStatus: any
}

//rfce adjusted to include typescript
const ScreenName: React.FC<Props> = ({
    handleSubmit,
    screenName,
    handleChange,
    gameStatus,
}) => {
    return (
        <section className="screenName_section">        
            <form className="screenName_form" onSubmit={handleSubmit}>
        
                <label htmlFor="screenName_id" className="screenName_label">Screen Name</label>
                <input 
                    type="text"
                    name="screenName"
                    id="screenName_id"
                    className="screenName_input"
                    value={screenName}
                    onChange={handleChange}
                />

            <h1 className="welcome">{ gameStatus }</h1> 
                <button   
                    type="submit"
                    className="screenName_btn" 
                >
                    Start Trivia
                </button>        
            </form>
        </section>
    )
}

export default ScreenName
