import React, { useContext, useEffect, useState } from 'react';
import './specialistBarChart.css';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import Chart from 'react-apexcharts';
import config from '../../../../config';

function SpecialistBarChart() {
    const { user } = useContext(AuthContext);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/consultAppointment/getOngoingAppointmentsCountForNext7Days/${user._id}`);
                setAppointmentsData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ongoing appointments count:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [user._id]);

    const dataEntries = Object.entries(appointmentsData).sort(([date1], [date2]) => new Date(date1) - new Date(date2));

    const labels = dataEntries.map(([date]) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const counts = dataEntries.map(([, count]) => count);

    const chartData = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: labels
            }
        },
        series: [
            {
                name: "Ongoing Appointments Count",
                data: counts
            }
        ]
    };

    return (
        <div className="specialist-bar-chart-container">
            <h2 className="specialist-bar-chart-chart-title">Ongoing Appointments for Next week</h2>
            {loading ? (
                <p>Loading...</p>
            ) : appointmentsData && Object.keys(appointmentsData).length > 0 ? (
                <div className="specialist-bar-chart-chart-wrapper">
                    <Chart
                        className="specialist-bar-chart-bar-chart"
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        width="500"
                    />
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default SpecialistBarChart;
