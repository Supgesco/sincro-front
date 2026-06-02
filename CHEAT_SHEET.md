# 📋 Java Cheat Sheet para Programadores Python

## Estrutura Básica

```java
// Uma classe deve estar em um arquivo com o mesmo nome
public class MeuPrograma {
    
    // Main - ponto de entrada (como if __name__ == '__main__')
    public static void main(String[] args) {
        System.out.println("Olá, Java!");
    }
}
```

---

## 📝 Tipos de Dados

```java
// Primitivos
int idade = 25;                 // inteiro
double altura = 1.75;          // decimal (float tem menos precisão)
boolean ativo = true;          // booleano (True em Python)
char letra = 'A';              // um caractere
long numeroGrande = 9223372036854775807L;
byte numero = 127;             // -128 a 127

// Não-primitivos
String nome = "João";          // classe String
int[] array = {1, 2, 3};       // array
List<Integer> lista = new ArrayList<>();  // lista dinâmica
```

---

## 🔢 Operadores

```java
// Aritméticos (como Python)
a + b                          // soma
a - b                          // subtração
a * b                          // multiplicação
a / b                          // divisão
a % b                          // módulo
Math.pow(a, b)                 // potência (Python: a ** b)

// Incremento/Decremento (não existe em Python)
i++                            // pós-incremento
++i                            // pré-incremento
i--                            // pós-decremento
--i                            // pré-decremento

// Comparação
a == b                         // igual
a != b                         // diferente
a > b, a < b                   // maior/menor
a >= b, a <= b                 // maior-igual/menor-igual

// Lógicos
a && b                         // AND (Python: and)
a || b                         // OR (Python: or)
!a                             // NOT (Python: not)

// Ternário (Python: x if cond else y)
condicao ? valor1 : valor2
```

---

## 📥 Entrada de Dados

```java
// Python: input()
// Java:   Scanner
import java.util.Scanner;

Scanner scan = new Scanner(System.in);

String texto = scan.nextLine();     // lê uma linha
int numero = scan.nextInt();        // lê um int
double decimal = scan.nextDouble(); // lê um double
boolean bool = scan.nextBoolean();  // lê um boolean

scan.close();  // sempre fechar
```

---

## 📤 Saída de Dados

```java
System.out.println("Texto");           // com quebra de linha
System.out.print("Texto");             // sem quebra de linha
System.out.printf("Número: %d\n", 42); // formatado

// Concatenação
String resultado = "Olá " + nome + "!";

// String formatting (Java 13+)
String msg = "Nome: %s, Idade: %d".formatted(nome, idade);
```

---

## 🎛️ Controle de Fluxo

### IF/ELSE
```java
if (condicao) {
    // código
} else if (outraCondicao) {
    // código
} else {
    // código
}
```

### SWITCH
```java
switch (valor) {
    case 1:
        // código
        break;
    case 2:
        // código
        break;
    default:
        // código
}
```

### FOR
```java
// Clássico
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// For-each (similar Python: for i in lista)
for (int num : array) {
    System.out.println(num);
}
```

### WHILE
```java
while (condicao) {
    // código
}

// Do-while (executa pelo menos uma vez)
do {
    // código
} while (condicao);
```

---

## 🏗️ Classes e Objetos

```java
public class Pessoa {
    // Atributos (private é padrão)
    private String nome;
    private int idade;
    
    // Construtor
    public Pessoa(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    // Getters
    public String getNome() {
        return nome;
    }
    
    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    // Métodos
    public void apresentar() {
        System.out.println("Olá, sou " + nome);
    }
}

// Usar
Pessoa p = new Pessoa("João", 25);
System.out.println(p.getNome());
p.apresentar();
```

---

## 🔗 Herança

```java
// Superclasse
public class Veiculo {
    protected String marca;  // acessível em subclasses
    
    public void andar() {
        System.out.println("Andando...");
    }
}

// Subclasse
public class Carro extends Veiculo {
    @Override  // sobrescrever método
    public void andar() {
        System.out.println("Carro andando com 4 rodas");
    }
    
    // Acessar superclasse
    public void chamarSuper() {
        super.andar();
    }
}

// Usar
Carro c = new Carro();
c.marca = "Toyota";
c.andar();
```

---

## 📦 Coleções

```java
// Array (tamanho fixo)
int[] numeros = {1, 2, 3, 4, 5};
numeros[0]                          // acessar
numeros.length                      // tamanho

// ArrayList (tamanho dinâmico)
List<Integer> lista = new ArrayList<>();
lista.add(1);                       // adicionar
lista.get(0);                       // obter
lista.remove(0);                    // remover
lista.size();                       // tamanho
lista.contains(1);                  // contém?

// Set (sem duplicatas)
Set<Integer> conjunto = new HashSet<>();
conjunto.add(1);
conjunto.contains(1);

// Map (dicionário)
Map<String, Integer> mapa = new HashMap<>();
mapa.put("idade", 25);              // adicionar
mapa.get("idade");                  // obter
mapa.remove("idade");               // remover
mapa.containsKey("idade");          // contém chave?

// Iteração
for (Integer num : lista) {
    System.out.println(num);
}

// Com streams
lista.stream()
    .filter(x -> x > 2)
    .forEach(System.out::println);
```

---

## ⚠️ Exceções

```java
try {
    // código que pode gerar erro
    int resultado = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Erro: " + e.getMessage());
} catch (Exception e) {  // genérico
    System.out.println("Erro geral");
} finally {
    System.out.println("Sempre executa");
}

// Lançar exceção
throw new IllegalArgumentException("Argumento inválido");
```

---

## 📄 Strings

```java
String texto = "Java";

// Métodos úteis
texto.length()                      // 4
texto.toUpperCase()                 // JAVA
texto.toLowerCase()                 // java
texto.trim()                        // remove espaços
texto.contains("av")                // true
texto.startsWith("Ja")              // true
texto.endsWith("va")                // true
texto.indexOf("v")                  // índice de 'v'
texto.substring(0, 2)               // "Ja"
texto.replace("Java", "Python")     // substitui
texto.split(",")                    // divide em array
texto.equals("Java")                // compara
texto.equalsIgnoreCase("java")      // compara (ignora caso)
texto.charAt(0)                     // primeiro char

// StringBuilder (para concatenação eficiente)
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String resultado = sb.toString();
```

---

## 📅 Datas

```java
import java.time.*;

LocalDate hoje = LocalDate.now();
LocalDate natal = LocalDate.of(2024, 12, 25);

// Operações
hoje.plusDays(1)                    // adicionar dias
hoje.minusMonths(1)                 // subtrair meses
hoje.isAfter(natal)                 // depois?
hoje.isBefore(natal)                // antes?

// Formatação
import java.time.format.DateTimeFormatter;
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
hoje.format(fmt)                    // "01/06/2026"

// DateTime
LocalDateTime agora = LocalDateTime.now();
agora.getHour()
agora.getMinute()
```

---

## 🧬 Generics

```java
// Sem tipo (evitar)
List lista = new ArrayList();  // ❌ sem segurança

// Com tipo (usar)
List<String> strings = new ArrayList<>();
Map<String, Integer> mapa = new HashMap<>();

// Classe genérica
public class Caixa<T> {
    private T conteudo;
    
    public T obter() {
        return conteudo;
    }
    
    public void guardar(T item) {
        this.conteudo = item;
    }
}

Caixa<String> caixa = new Caixa<>();
```

---

## ⚡ Lambda e Streams

```java
// Lambda
(a, b) -> a + b
x -> x * 2
() -> System.out.println("Olá")

// Streams
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);

// Map - transformar
nums.stream()
    .map(x -> x * 2)
    .toList()                       // [2, 4, 6, 8, 10]

// Filter - selecionar
nums.stream()
    .filter(x -> x > 2)
    .toList()                       // [3, 4, 5]

// Reduce - agregar
nums.stream()
    .reduce(0, (a, b) -> a + b)    // 15 (soma)

// ForEach
nums.stream()
    .forEach(System.out::println);  // imprime cada um

// Pipeline
nums.stream()
    .filter(x -> x > 2)
    .map(x -> x * 2)
    .forEach(System.out::println);
```

---

## 🔄 Comparação: Python vs Java

| Operação | Python | Java |
|----------|--------|------|
| Print | `print("Olá")` | `System.out.println("Olá")` |
| Input | `x = input()` | `x = scan.nextLine()` |
| Lista | `lista = [1,2,3]` | `List<Integer> lista = new ArrayList<>()` |
| Dict | `d = {'a': 1}` | `Map<String, Integer> m = new HashMap<>()` |
| For | `for i in range(5):` | `for (int i = 0; i < 5; i++)` |
| If | `if x > 5:` | `if (x > 5) {` |
| Função | `def foo():` | `public void foo() {` |
| Classe | `class Foo:` | `public class Foo {` |
| Try | `try: except:` | `try { } catch () {` |
| Null | `None` | `null` |
| Lambda | `lambda x: x*2` | `x -> x*2` |

---

## 🆘 Erros Comuns

```java
// ❌ Esquecer ponto-e-vírgula
int x = 5  // Erro!

// ❌ Esquecer chaves
if (x > 5)
    System.out.println("Sim");  // Erro!

// ❌ Usar Type errado
int x = "texto";  // Erro de tipo!

// ❌ Array fora do intervalo
int[] arr = {1, 2};
arr[5];  // ArrayIndexOutOfBoundsException!

// ❌ Comparar Strings com ==
if (nome == "João") {  // Errado!
    
// ✅ Usar equals
if (nome.equals("João")) {  // Correto!
```

---

## 📚 Imports Comuns

```java
import java.util.*;              // Collections
import java.io.*;                // I/O
import java.time.*;              // Datas
import java.time.format.*;       // Formatação de datas
import java.util.stream.*;       // Streams
import java.util.regex.Pattern;  // Regex
```

---

**Pronto! Agora você tem um guia rápido para consultar! 🚀**
