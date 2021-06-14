import React from "react";


class CurrentClock extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            time: Date.now(),
            time_area_list: []
        };
    }

    componentDidMount()
    {
        this.interval = setInterval(() => this.setState( { time: Date.now() } ) );

        let list_string = window.localStorage.getItem("time_area_list" );
        let list = []

        if ( list_string !== null && list_string !== undefined && list_string.length !== 0 )
        {
            list = JSON.parse( list_string )
        }

        this.setState( { time_area_list: list } )
    }

    getTm( hour, min, sec = 0 )
    {
        return hour * 60 * 60 + min * 60 + sec;
    }

    getCurTm( )
    {
        let now = new Date( Date.now() )

        let cur_hour = now.getHours()
        let cur_min = now.getMinutes()
        let cur_sec = now.getSeconds()
        return this.getTm( cur_hour, cur_min, cur_sec )
    }

    getRemainTime( area_hour, area_min )
    {
        let area_tm = this.getTm( area_hour, area_min )
        let cur_tm = this.getCurTm()
        let remain_tm = area_tm - cur_tm

        return remain_tm
    }


    drawRemainAreaTm( )
    {
        let cur_tm = this.getCurTm();
        let list = []

        for ( let area_data of this.state.time_area_list ) {
            let area_start_tm = this.getTm(area_data.start_hour, area_data.start_min)
            let area_end_tm = this.getTm(area_data.end_hour, area_data.end_min)

            if ( area_start_tm <= cur_tm && area_end_tm >= cur_tm )
            {
                list.push( area_data )
            }
        }

        if ( list.length === 0 )  { return (<p>없어용!</p>) }

        return (list.map( (area_data) => {
            return <div>
                <p>{ "현재 권역 : " + area_data.area_name }</p>
                <p>{" 남은 시간 : " + this.getRemainTime( area_data.end_hour, area_data.end_min )}</p>
            </div>
        }))
    }

    render()
    {
        return (
            <div className={"Time"}>
                <p>
                    {this.state.time}
                </p>
                <div>
                    {
                        this.drawRemainAreaTm()
                    }
                </div>

                <div>
                    {
                        this.state.time_area_list.map( c=> {
                            return(
                                <body>
                                {
                                    c.area_name + "/" + c.start_hour + "/" + c.start_min + "/" +
                                    c.end_hour + "/" + c.end_min + "\n"
                                }
                                </body>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default CurrentClock;