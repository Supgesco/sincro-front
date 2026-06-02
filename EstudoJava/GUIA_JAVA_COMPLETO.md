# 🎓 Guia Completo: Python para Java - Estudo Progressivo

Bem-vindo! Este é um **estudo guiado de Java para programadores Python**.

Você tem conhecimento em Python e agora quer aprender Java. Este material está estruturado em **6 fases progressivas**, cada uma construindo sobre a anterior.

---

## 📋 Estrutura do Curso

| Fase | Tópico | Arquivo | Tempo |
|------|--------|---------|-------|
| 1️⃣ | **Fundamentos** - Sintaxe, variáveis, tipos, controle de fluxo | `Fase1_Fundamentos.java` | 1-2h |
| 2️⃣ | **OOP** - Classes, herança, polimorfismo, interfaces | `Fase2_OOP.java` | 2-3h |
| 3️⃣ | **Coleções** - Arrays, Lists, Sets, Maps | `Fase3_Colecoes.java` | 1-2h |
| 4️⃣ | **Exceções & I/O** - Try/catch, arquivos | `Fase4_ExcecoesIO.java` | 1-2h |
| 5️⃣ | **Strings & Datas** - Manipulação, formatação | `Fase5_StringsDatas.java` | 1-2h |
| 6️⃣ | **Padrões Avançados** - Generics, Lambdas, Streams | `Fase6_PadroesAvancados.java` | 2-3h |

---

## 🚀 Como Começar

### Pré-requisitos
- ✅ Java 21 (já instalado no seu sistema)
- ✅ VS Code com extensão Java
- ✅ Um terminal PowerShell

### Executar uma Fase

Escolha uma fase e execute:

```powershell
cd C:\Users\davi.silva\Documents\Geral\Sicro
javac Fase1_Fundamentos.java
java Fase1_Fundamentos
```

**Ou use o atalho VS Code:**
1. Abra o arquivo `.java`
2. Clique no ▶️ (Run Code) ou pressione `Ctrl+Alt+N`

---

## 📚 Resumo de Cada Fase

### Fase 1️⃣: Fundamentos (1-2 horas)
**O que você aprenderá:**
- Estrutura básica de um programa Java
- Tipos de dados primitivos (int, double, boolean, char, String)
- Operadores (aritméticos, lógicos, comparação)
- Entrada de dados com Scanner
- Controle de fluxo (if/else, switch, for, while)

**Comparações Python vs Java:**
```python
# Python
x = 5                    # Tipo automático
for i in range(5):       # Loop simples
    print(i)
```

```java
// Java
int x = 5;               // Tipo obrigatório
for (int i = 0; i < 5; i++) {  // Mais verboso
    System.out.println(i);
}
```

**Executar:**
```bash
javac Fase1_Fundamentos.java && java Fase1_Fundamentos
```

---

### Fase 2️⃣: Programação Orientada a Objetos (2-3 horas)
**O que você aprenderá:**
- Criar classes e objetos
- Encapsulamento (private, getters, setters)
- Herança (extends)
- Polimorfismo
- Interfaces
- @Override e super()

**Exemplo:**
```java
class Veiculo {
    protected String marca;
    
    public void andar() {
        System.out.println("Andando...");
    }
}

class Carro extends Veiculo {
    @Override
    public void andar() {
        System.out.println("Carro andando com 4 rodas");
    }
}
```

**Executar:**
```bash
javac Fase2_OOP.java && java Fase2_OOP
```

---

### Fase 3️⃣: Coleções (1-2 horas)
**O que você aprenderá:**
- Arrays (tamanho fixo)
- ArrayList (tamanho dinâmico) ← similar a list Python
- Set (sem duplicatas)
- HashMap (dicionário)
- Iteração com for-each
- Operações com Collections

**Exemplo:**
```java
// Equivalente a:
# Python: lista = [1, 2, 3]
// Java:
List<Integer> lista = new ArrayList<>();
lista.add(1);
lista.add(2);
lista.add(3);
```

**Executar:**
```bash
javac Fase3_Colecoes.java && java Fase3_Colecoes
```

---

### Fase 4️⃣: Exceções e I/O (1-2 horas)
**O que você aprenderá:**
- Try/catch/finally
- Múltiplos catch
- Leitura de arquivos
- Escrita em arquivos
- Exceções personalizadas
- Try-with-resources

**Exemplo:**
```java
try {
    int resultado = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Erro: " + e.getMessage());
} finally {
    System.out.println("Sempre executa");
}
```

**Executar:**
```bash
javac Fase4_ExcecoesIO.java && java Fase4_ExcecoesIO
```

---

### Fase 5️⃣: Strings e Datas (1-2 horas)
**O que você aprenderá:**
- Métodos de String (length, toUpperCase, contains, replace, etc.)
- StringBuilder (para concatenação eficiente)
- String formatting
- LocalDate e LocalDateTime
- DateTimeFormatter
- Cálculos com datas

**Exemplo:**
```java
String texto = "Java";
System.out.println(texto.length());        // 4
System.out.println(texto.toUpperCase());   // JAVA
System.out.println(texto.contains("av"));  // true

LocalDate hoje = LocalDate.now();
LocalDate natal = LocalDate.of(2024, 12, 25);
```

**Executar:**
```bash
javac Fase5_StringsDatas.java && java Fase5_StringsDatas
```

---

### Fase 6️⃣: Padrões Avançados (2-3 horas)
**O que você aprenderá:**
- Generics (type safety)
- Lambda expressions
- Streams API
- map, filter, reduce
- collect
- Method references

**Exemplo:**
```java
// Python: [x*2 for x in numeros if x > 5]
// Java:
List<Integer> resultado = numeros.stream()
    .filter(x -> x > 5)
    .map(x -> x * 2)
    .toList();
```

**Executar:**
```bash
javac Fase6_PadroesAvancados.java && java Fase6_PadroesAvancados
```

---

## 🔑 Diferenças Principais: Python vs Java

| Aspecto | Python | Java |
|---------|--------|------|
| **Tipos** | Dinâmico | Estático (obrigatório) |
| **Ponto-e-vírgula** | Não | Sim |
| **Chaves** | Não (indentação) | Sim |
| **Compilação** | Interpretado | Compilado |
| **String** | Primitivo | Classe |
| **Main** | if __name__ == '__main__' | public static void main() |
| **Input** | input() | Scanner |
| **For** | for i in range(5) | for (int i = 0; i < 5; i++) |
| **Lista** | list = [1,2,3] | List<Integer> lista = new ArrayList<>() |
| **Dict** | dict = {'a': 1} | Map<String, Object> map = new HashMap<>() |
| **Try/Except** | except Exception | catch (Exception e) |
| **Null** | None | null |
| **Funções** | def funcao() | public void funcao() |
| **Classes** | class Opcional | class Obrigatório |

---

## 💡 Dicas de Aprendizado

### 1. **Leia o Código Com Atenção**
Cada arquivo tem comentários explicativos. Leia-os linha por linha.

### 2. **Experimente as Mudanças**
- Mude valores
- Teste diferentes inputs
- Tente quebrar o código (propositalmente)

### 3. **Execute com Debugger**
Use o VS Code Debugger para ver o que acontece passo a passo.

### 4. **Faça Pequenos Projetos**
Depois de cada fase, tente criar algo pequeno:
- Fase 1: Calculadora simples
- Fase 2: Sistema de Pessoas (classe)
- Fase 3: Sistema de Tarefas (com lista)
- Fase 4: Leitor de arquivo de dados
- Fase 5: Calculador de idade
- Fase 6: Filtrador de dados

### 5. **Compare com Python**
Se tiver dúvida, escreva a mesma coisa em Python e depois em Java.

---

## 📝 Checklist de Aprendizado

Conforme você avança, marque o que já sabe:

### Fase 1
- [ ] Criar e executar um programa Java
- [ ] Entender tipos primitivos
- [ ] Usar Scanner para entrada
- [ ] Escrever if/else, loops

### Fase 2
- [ ] Criar uma classe com construtor
- [ ] Usar private/public
- [ ] Escrever getters e setters
- [ ] Herança com extends
- [ ] Polimorfismo básico
- [ ] Usar interfaces

### Fase 3
- [ ] Criar e usar Arrays
- [ ] Usar ArrayList
- [ ] Iterar com for-each
- [ ] Usar HashMap
- [ ] Usar HashSet

### Fase 4
- [ ] Try/catch básico
- [ ] Múltiplos catch
- [ ] Finally
- [ ] Ler arquivo com Scanner
- [ ] Escrever em arquivo

### Fase 5
- [ ] Métodos String comuns
- [ ] Usar StringBuilder
- [ ] LocalDate e LocalDateTime
- [ ] Formatar datas

### Fase 6
- [ ] Entender Generics
- [ ] Escrever lambdas
- [ ] Usar streams
- [ ] map/filter/reduce
- [ ] collect

---

## 🆘 Problema? Aqui está o que fazer:

1. **Erro de Compilação**
   - Verifique `;` no final de linhas
   - Verifique `{}` balanceados
   - Verifique tipos corretos

2. **Erro em Runtime**
   - Leia a mensagem de erro (em inglês)
   - Use o debugger para ver valores
   - Tente adicionar System.out.println() para debug

3. **Não entendo um conceito**
   - Leia o comentário no código
   - Compare com a versão Python
   - Tente modificar o código e ver o resultado

---

## 📖 Próximos Passos (Após as 6 Fases)

Se você concluir tudo com sucesso:

1. **Frameworks**
   - Spring Boot (para aplicações web)
   - Hibernate (para banco de dados)

2. **Arquitetura**
   - Design Patterns (Singleton, Factory, etc.)
   - Clean Code
   - SOLID Principles

3. **Projetos Práticos**
   - Build um CLI (Command Line Interface)
   - Build um REST API
   - Build uma aplicação desktop

---

## 🎯 Tempo Total Estimado

- Leitura e entendimento: **15-20 horas**
- Prática e experimentos: **10-15 horas**
- Projetos pequenos: **5-10 horas**

**Total: 30-45 horas de estudo dedicado**

---

## 📞 Resumo Rápido

Quando tiver dúvida, volte aqui:

```
Preciso de...                    → Use Fase
Variáveis e tipos               → Fase 1
Classes e objetos               → Fase 2
Listas/dicionários              → Fase 3
Tratar erros                    → Fase 4
Manipular texto/data            → Fase 5
Processamento funcional         → Fase 6
```

---

**Boa sorte! 🚀 Você tem tudo que precisa para dominar Java!**

Comece pela Fase 1 agora mesmo! ⬇️
