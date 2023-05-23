import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartToolTip,
    ArcElement,
    LineElement,
    PointElement
} from 'chart.js';
import { Bar, Pie, Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const Analitika = () => {
    const [zahtevi, setZahtevi] = useState([]);
    const [pitanja, setPitanja] = useState([]);
    const [licna, setLicna] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [uobradi, setUObradi] = useState([]);
    const [primljeno, setPrimljeno] = useState([]);
    const [razreseno, setRazreseno] = useState([]);
    const [musko, setMusko] = useState([]);
    const [zensko, setZensko] = useState([]);
    const [population, setPopulation] = useState();
    const [dataPopulation, setDataPopulation] = useState();
    const [country, setCountry] = useState('SRB');
    useEffect(() => {
        axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json`, {
            params: {
                year: 2022
            }
        })
            .then(response => {
                console.log(response.data[1]);
                setPopulation(response.data[1].filter((populationByYear) => populationByYear.value != null));
            })
            .catch(error => {
                console.error(error);
            });
    }, country)

    // const [data, setData] = useState();
    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await axios
                    .get('http://localhost:8080/api/v1/zahtevi', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => {
                        setZahtevi(response.data.content);
                        setLicna(response.data.content.filter((zahtev) => (zahtev.tipUsluge === "IZDAVANJE_LICNE_KARTE")));
                        setPasos(response.data.content.filter((zahtev) => (zahtev.tipUsluge === "IZDAVANJE_PASOSA")));
                        setPitanja(response.data.content.filter((zahtev) => (zahtev.tipUsluge === "PITANJA")));
                        setRazreseno(response.data.content.filter((zahtev) => (zahtev.statusZahteva === "RAZRESENO")));
                        setUObradi(response.data.content.filter((zahtev) => (zahtev.statusZahteva === "U_OBRADI")));
                        setPrimljeno(response.data.content.filter((zahtev) => (zahtev.statusZahteva === "PRIMLJEN")));
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataUser();
    }, []);
    const [chartDataTip, setChartDataTip] = useState({
        datasets: [],
    })
    const [chartDataStatus, setChartDataStatus] = useState({
        datasets: [],
    })
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        if (primljeno != null) {
            console.log(primljeno.length + '' + uobradi.length + '' + razreseno.length);
            setChartDataTip({
                labels: ["Lična karta", "Pasoš", "Pitanje"],
                datasets: [{
                    label: "Broj zahteva",
                    data: [licna.length, pasos.length, pitanja.length],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)",
                }]
            })
            setChartDataStatus({
                labels: ["Primljeno", "U obradi", "Razreseno"],
                datasets: [{
                    label: "Broj zahteva",
                    data: [primljeno.length, uobradi.length, razreseno.length],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)",
                }]
            })
        }

    }, [licna])

    const [data, setData] = useState();

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await axios
                    .get('http://localhost:8080/api/v1/korisnici', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => {
                        setMusko(response.data.content.filter((korisnik) => (korisnik.pol === "MUSKI")));
                        setZensko(response.data.content.filter((korisnik) => (korisnik.pol === "ZENSKI")));
                        // console.log(zensko.length);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataUser();
    }, []);
    useEffect(() => {
        if (musko != null && zensko != null) {
            setData({
                datasets: [
                    {
                        data: [musko.length, zensko.length],
                        backgroundColor: ['blue', 'pink'],
                    },
                ],
                labels: ['musko(' + (musko.length) + ')', 'zensko(' + (zensko.length) + ')'],
            });
        }

    }, [musko, zensko])
    useEffect(() => {
        if (population != null) {
            setDataPopulation({
                labels: [population[5]?.date, population[4]?.date, population[3]?.date, population[2]?.date, population[1]?.date],
                datasets: [{
                    label: 'Broj stanovnika',
                    data: [population[5]?.value, population[4]?.value, population[3]?.value, population[2]?.value, population[1]?.value],
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    pointBorderColor: 'blue'
                }]
            })
        }
    }, [population])
    return (
        <div className="analitika">
            <div className="bar">
                <div className="box">
                    <h1 style={{ color: '#007bff' }}>Broj zahteva prema tipu usluge</h1>
                    <Bar options={chartOptions} data={chartDataTip} className="chart" />
                </div>
                <div className="box" style={{marginTop: '15%' }}>
                    <h1 style={{ color: '#007bff' }}>Broj zahteva u prema statusu</h1>
                    <Bar options={chartOptions} data={chartDataStatus} className="chart" />
                </div>
            </div>
            <div className="bar">
                <div className="box"><div style={{ width: '300px', marginLeft: '22%' }}>
                <h1 style={{color: '#007bff'}}>Prikaz korisnika u odnosu na pol</h1>
                    {data && <Pie data={data} />}</div>
                </div>
                <div className="box" style={{marginTop: '15%' }}>
                <h1 style={{color: '#007bff'}}>Prikaz stanovnistva</h1>
                    {dataPopulation && <Line data={dataPopulation} />}
                    <div className="country-select">
                        <select name="language" id="kovid" onChange={(e) => setCountry(e.target.value)} style={{ marginLeft: '27%' }}>
                            <option value="SRB">Srbija</option>
                            <option value="FRA">Francuska</option>
                            <option value="DEU">Nemacka</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Analitika;