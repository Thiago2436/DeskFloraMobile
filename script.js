document.addEventListener("DOMContentLoaded", function() {

    const coletarButton = document.querySelector("#coletar-button");
    const downloadButton = document.querySelector("#download-excel");
    const sairButton = document.querySelector("#sair-button");
    const inventarioTable = document.querySelector("#inventario-table");
    const localizacaoInput = document.querySelector("#localizacao");

      // Verifica se o navegador suporta a API Geolocation
      if ("geolocation" in navigator) {
        // Obtém a posição atual do usuário
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const localizacao = `Lat: ${latitude}, Long: ${longitude}`;
      
          // Preenche o campo "Localização" com os dados do GPS
          localizacaoInput.value = localizacao;
        });
      } else {
        // O navegador não suporta a API Geolocation
        alert("Seu navegador não suporta a API Geolocation.");
      }
  
    let inventario = [];
  
    // Recupera os dados salvos do localStorage e preenche a tabela
    if (localStorage.getItem("inventario")) {
      inventario = JSON.parse(localStorage.getItem("inventario"));
      atualizarTabela();
    }
  
    coletarButton.addEventListener("click", () => {

      
      const especieInput = document.querySelector("#especie");
      const diametroInput = document.querySelector("#diametro");
      const alturaInput = document.querySelector("#altura");
      
      const sanidadeInput = document.querySelector("#sanidade");

      const especie = especieInput.value;
      const diametro = diametroInput.value;
      const altura = alturaInput.value;
      const sanidade = sanidadeInput.value;
      const localizacao = localizacaoInput.value;
        
        
       

  
      if (especie && diametro && altura && localizacao && sanidade) {
        const novoRegistro = { especie, diametro, altura, localizacao, sanidade };
        inventario.push(novoRegistro);
  
        // Limpa o formulário
        especieInput.value = "";
        diametroInput.value = "";
        alturaInput.value = "";
        localizacaoInput.value = "";
        sanidadeInput.value = "";
  
        // Atualiza a tabela e salva os dados no localStorage
        atualizarTabela();
        localStorage.setItem("inventario", JSON.stringify(inventario));
            }
        
            // Verifica se o navegador suporta a API Geolocation
      if ("geolocation" in navigator) {
        // Obtém a posição atual do usuário
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const localizacao = `Lat: ${latitude}, Long: ${longitude}`;
      
          // Preenche o campo "Localização" com os dados do GPS
          localizacaoInput.value = localizacao;
        });
      } else {
        // O navegador não suporta a API Geolocation
        alert("Seu navegador não suporta a API Geolocation.");
      }
    });
  
    function atualizarTabela() {
      inventarioTable.innerHTML = "";
      inventario.forEach((registro) => {
        const { especie, diametro, altura, localizacao, sanidade } = registro;
  
        const tr = document.createElement("tr");
  
        const especieTd = document.createElement("td");
        especieTd.textContent = especie;
  
        const diametroTd = document.createElement("td");
        diametroTd.textContent = diametro;
  
        const alturaTd = document.createElement("td");
        alturaTd.textContent = altura;

        const localizacaoTd = document.createElement("td");
        localizacaoTd.textContent = localizacao;

        const sanidadeTd = document.createElement("td");
        sanidadeTd.textContent = sanidade;
  
        tr.appendChild(especieTd);
        tr.appendChild(diametroTd);
        tr.appendChild(alturaTd);
        tr.appendChild(localizacaoTd);
        tr.appendChild(sanidadeTd);
  
        inventarioTable.appendChild(tr);
      });
    }
  
    downloadButton.addEventListener("click", () => {
      if (inventario.length > 0) {
  
        // Cabeçalho da tabela
        const header = "Espécie, Diâmetro (cm), Altura (m), Localizacao(GPS), Sanidade \n";
  
  
        const csvContent = "data:text/csv;charset=utf-8," 
          + header // Adiciona o cabeçalho antes dos registros
          + inventario.map((registro) => Object.values(registro).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "inventario.csv");
        document.body.appendChild(link);
        link.click();
      }
    });
  
    sairButton.addEventListener("click", () => {
      const confirmacao = confirm("Tem certeza de que deseja Limpar os dados ?");
  
      if (confirmacao) {
        inventario = [];
        atualizarTabela();
        localStorage.removeItem("inventario"); // Remove os dados salvos do localStorage ao sair
      }
    });
  
  });
  