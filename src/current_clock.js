import React from "react";


class CurrentClock extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            time: Date.now()
        };
    }

    componentDidMount()
    {
        this.interval = setInterval(() => this.setState( { time: Date.now() } ) );
    }

    render()
    {
        return (
            <div className={"Time"}>
                <p>
                    {this.state.time}
                </p>
            </div>
        )
    }
}

export default CurrentClock;