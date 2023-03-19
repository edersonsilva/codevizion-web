import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

function DashboardCard07() {
  const [data, setData] = useState([]);
  const [filial, setFilial] = useState("");
  // const [avgFilter, setAvgFilter] = useState("");
  const [periodo01, setPeriodo01] = useState("");
  const [periodo02, setPeriodo02] = useState("");
  const [periodo03, setPeriodo03] = useState("");
  const [ano, setAno] = useState("");

  const fetchData = async (filial, ano, periodo01, periodo02, periodo03) => {
    try {
      const [api1Response, api2Response, api3Response, api4Response] =
        await Promise.all([
          axios.get(`${API_URL}/periodo?filial=${filial}&periodo=${periodo01}`),
          axios.get(`${API_URL}/periodo?filial=${filial}&periodo=${periodo02}`),
          axios.get(`${API_URL}/periodo?filial=${filial}&periodo=${periodo03}`),
          axios.get(
            `http://localhost:8081/api/v1/media-anual?filial=${filial}&ano=${ano}`
          ),
        ]);

      const data = api1Response.data.map((item, index) => {
        return {
          ...item,
          ...api2Response.data[index],
          ...api3Response.data[index],
          ...api4Response.data[index],
        };
      });

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchDataAsync = async () => {
    const data = await fetchData(filial, ano, periodo01, periodo02, periodo03);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchDataAsync();
  }, [filial, ano, periodo01, periodo02, periodo03]);

  const handleFilialChange = (event) => {
    setFilial(event.target.value);
  };

  const handleAnoChange = (event) => {
    setAno(event.target.value);
  };

  const handlePeriodoChange01 = (event) => {
    setPeriodo01(event.target.value);
  };

  const handlePeriodoChange02 = (event) => {
    setPeriodo02(event.target.value);
  };

  const handlePeriodoChange03 = (event) => {
    setPeriodo03(event.target.value);
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 text-center">
        <h2 className="font-semibold text-slate-800">
          Demostrativo de Resultado do Exercício
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">
                    <label htmlFor="filial">Filial:</label>
                    <input
                      className="border-gray-300 rounded-sm px-2 py-1 text-sm items-center"
                      id="filial"
                      type="text"
                      value={filial}
                      onChange={handleFilialChange}
                      placeholder="Filtrar descrição"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-sm px-2 py-1 text-sm"
                      value={ano}
                      onChange={handleAnoChange}
                      placeholder="Filtrar média anual"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-sm px-2 py-1 text-sm"
                      value={periodo01}
                      onChange={handlePeriodoChange01}
                      placeholder="Filtrar janeiro"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-sm px-2 py-1 text-sm"
                      value={periodo02}
                      onChange={handlePeriodoChange02}
                      placeholder="Filtrar fevereiro"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-sm px-2 py-1 text-sm"
                      value={periodo03}
                      onChange={handlePeriodoChange03}
                      placeholder="Filtrar março"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm text-left">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Descrição</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Média Anual</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Janeiro / 2023{" "}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Fevereiro / 2023{" "}
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Março / 2023</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {data.map((dado) => {
                const valor = dado.valor.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });

                const valor3 = dado[3].toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });

                return (
                  <tr key={dado.id}>
                    <td className="p-2">
                      <div className="items-center">{dado.descricao}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-end">{valor3}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-end">{valor}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-end">{valor}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-end">{valor}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
