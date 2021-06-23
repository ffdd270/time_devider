import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from "@material-ui/core/Button";

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

    getRemainPercent( start_hour, start_min, end_hour, end_min )
    {
        let start_tm = this.getTm( start_hour, start_min )
        let end_tm = this.getTm( end_hour, end_min )

        let total_tm = end_tm - start_tm
        let cur_tm = this.getCurTm()
        let remain_tm = end_tm - cur_tm

        return Math.floor( (remain_tm / total_tm) * 1000 ) / 10
    }

    getRemainSec( area_hour, area_min )
    {
        let area_tm = this.getTm( area_hour, area_min )
        let cur_tm = this.getCurTm()
        return area_tm - cur_tm
    }

    paddingStr( str )
    {
        if ( str.length < 2 )
        {
            str = "0" + str;
        }

        return str;
    }

    getRemainTime( area_hour, area_min )
    {
        let sec = this.getRemainSec( area_hour, area_min )
        let hour = Math.floor( sec / 60 / 60 )
        sec -= ( hour * 60 * 60 )
        let min = Math.floor( sec / 60 );
        sec -= ( min * 60 )

        let result_str = ""

        if ( hour > 0 )
        {
            result_str += this.paddingStr( hour.toString() ) + ":";
        }

        if ( min > 0 )
        {
            result_str += this.paddingStr( min.toString() ) + ":";
        }

        result_str += this.paddingStr( sec.toString() );
        return result_str;
    }

    drawRemainAreaTm()
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

        for ( let select_list_data of list )
        {
            let start_area_end_tm = this.getTm(select_list_data.end_hour, select_list_data.end_min)
            let next_area_data = null;

            for ( let area_data of this.state.time_area_list )
            {
                let area_start_tm = this.getTm(area_data.start_hour, area_data.start_min)

                if ( start_area_end_tm === area_start_tm )
                {
                    next_area_data = area_data;
                    break;
                }
            }

            select_list_data.next_area_data = next_area_data

        }
        
        return (list.map( (area_data) => {
            let next_area_name = ''
            if ( area_data.next_area_data !== null )
            {
                next_area_name = " -> 다음 권역 : " + area_data.next_area_data.area_name
            }
            let percent =  this.getRemainPercent( area_data.start_hour, area_data.start_min, area_data.end_hour, area_data.end_min )
            return <div>
                <p>{ "현재 권역 : " + area_data.area_name + next_area_name }</p>
                <p>{" 남은 시간 : " + this.getRemainTime( area_data.end_hour, area_data.end_min ) + " (" + percent + "%)" }</p>
                <div>
                    <LinearProgress variant="determinate" value={ 100 - percent } />
                </div>
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
                                <Button variant="contained" color={"secondary"} onClick={event=>{this.props.onRequestTimeArea( c.area_name )}}>수정</Button>
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