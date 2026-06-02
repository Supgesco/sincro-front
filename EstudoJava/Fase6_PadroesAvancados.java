/**
 * FASE 6: PADRÕES AVANÇADOS
 * 
 * Generics, Lambdas e Streams (Java 8+)
 * Estes são recursos muito poderosos que Java tem
 * Python não tem equivalentes tão formalizados
 */

import java.util.*;
import java.util.stream.*;

public class Fase6_PadroesAvancados {
    
    public static void main(String[] args) {
        System.out.println("=== FASE 6: PADRÕES AVANÇADOS ===\n");
        
        // ============================================
        // 1. GENERICS
        // ============================================
        System.out.println("1. GENERICS (Type Safety)\n");
        System.out.println("Permitem que você crie classes e métodos reutilizáveis");
        System.out.println("Com segurança de tipo em tempo de compilação");
        
        // Sem generics (antigo) - RUIM
        // List lista = new ArrayList();  // ❌ Sem tipo
        // lista.add("String");
        // lista.add(123);
        // String valor = (String) lista.get(1);  // ClassCastException possível
        
        // Com generics - BOM
        List<String> strings = new ArrayList<>();
        strings.add("Java");
        strings.add("Python");
        // strings.add(123);  // ❌ Erro em tempo de compilação
        
        System.out.println("Lista de Strings: " + strings);
        
        // Classe genérica
        Caixa<String> caixaString = new Caixa<>("Tesouro");
        System.out.println("Caixa com String: " + caixaString.obter());
        
        Caixa<Integer> caixaInt = new Caixa<>(42);
        System.out.println("Caixa com Integer: " + caixaInt.obter());
        
        Caixa<Double> caixaDouble = new Caixa<>(3.14);
        System.out.println("Caixa com Double: " + caixaDouble.obter());
        
        // ============================================
        // 2. LAMBDAS (Java 8+)
        // ============================================
        System.out.println("\n2. LAMBDA EXPRESSIONS\n");
        System.out.println("Python: lambda x: x * 2");
        System.out.println("Java:   x -> x * 2");
        
        // Interface funcional
        Operacao adicao = (a, b) -> a + b;
        Operacao multiplicacao = (a, b) -> a * b;
        
        System.out.println("5 + 3 = " + adicao.calcular(5, 3));
        System.out.println("5 * 3 = " + multiplicacao.calcular(5, 3));
        
        // Lambda com lógica mais complexa
        Operacao maiorNumero = (a, b) -> {
            if (a > b) return a;
            return b;
        };
        System.out.println("Maior entre 10 e 7: " + maiorNumero.calcular(10, 7));
        
        // Sorted com lambda
        List<String> nomes = Arrays.asList("Zoe", "Ana", "Bruno", "Clara");
        System.out.println("\nNomes original: " + nomes);
        
        nomes.sort((a, b) -> a.compareTo(b));
        System.out.println("Nomes ordenados (A-Z): " + nomes);
        
        nomes.sort((a, b) -> b.compareTo(a));
        System.out.println("Nomes ordenados (Z-A): " + nomes);
        
        // ============================================
        // 3. STREAMS
        // ============================================
        System.out.println("\n3. STREAMS (processamento de dados)\n");
        
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        System.out.println("Lista original: " + numeros);
        
        // Map - transformar cada elemento
        System.out.println("\nMap (transformar):");
        System.out.println("Python: [x*2 for x in lista]");
        System.out.println("Java:   stream().map(x -> x*2).toList()");
        
        List<Integer> dobrados = numeros.stream()
            .map(x -> x * 2)
            .toList();
        System.out.println("Dobrados: " + dobrados);
        
        // Filter - selecionar elementos
        System.out.println("\nFilter (selecionar):");
        System.out.println("Python: [x for x in lista if x > 5]");
        System.out.println("Java:   stream().filter(x -> x > 5).toList()");
        
        List<Integer> maioresQue5 = numeros.stream()
            .filter(x -> x > 5)
            .toList();
        System.out.println("Maiores que 5: " + maioresQue5);
        
        // Combinar operações - PIPELINE
        System.out.println("\nPipeline (encadear operações):");
        System.out.println("Python: [x*2 for x in lista if x > 3]");
        System.out.println("Java:   stream().filter(...).map(...).toList()");
        
        List<Integer> resultado = numeros.stream()
            .filter(x -> x > 3)
            .map(x -> x * 2)
            .toList();
        System.out.println("Maiores que 3, depois dobrados: " + resultado);
        
        // Operações terminais
        System.out.println("\nOperações Terminais:");
        
        // ForEach
        System.out.println("forEach:");
        numeros.stream()
            .filter(x -> x % 2 == 0)
            .forEach(x -> System.out.print(x + " "));
        System.out.println();
        
        // Reduce (agregação)
        System.out.println("\nReduce (agregar):");
        int soma = numeros.stream()
            .reduce(0, (acc, x) -> acc + x);
        System.out.println("Soma de todos: " + soma);
        
        int produto = numeros.stream()
            .reduce(1, (acc, x) -> acc * x);
        System.out.println("Produto de todos: " + produto);
        
        // Collect
        System.out.println("\nCollect (agrupar):");
        
        Set<Integer> conjuntoUnicos = numeros.stream()
            .collect(Collectors.toSet());
        System.out.println("Como Set: " + conjuntoUnicos);
        
        String concatenado = numeros.stream()
            .map(String::valueOf)
            .collect(Collectors.joining(", "));
        System.out.println("Concatenado: " + concatenado);
        
        // ============================================
        // 4. OPERAÇÕES EM OBJETOS
        // ============================================
        System.out.println("\n4. STREAMS COM OBJETOS\n");
        
        List<PessoaFase6> pessoas = Arrays.asList(
            new PessoaFase6("João", 25),
            new PessoaFase6("Maria", 30),
            new PessoaFase6("Carlos", 22),
            new PessoaFase6("Ana", 28)
        );
        
        System.out.println("Pessoas:");
        pessoas.forEach(p -> System.out.println("  " + p));
        
        // Ordenar
        System.out.println("\nOrdenar por idade:");
        pessoas.stream()
            .sorted((a, b) -> Integer.compare(a.idade, b.idade))
            .forEach(p -> System.out.println("  " + p.nome + ": " + p.idade));
        
        // Filtrar
        System.out.println("\nMaior de idade (>= 25):");
        pessoas.stream()
            .filter(p -> p.idade >= 25)
            .map(p -> p.nome)
            .forEach(nome -> System.out.println("  " + nome));
        
        // Cálculos
        System.out.println("\nEstatísticas:");
        double idadeMedia = pessoas.stream()
            .mapToInt(p -> p.idade)
            .average()
            .orElse(0);
        System.out.println("Idade média: " + String.format("%.1f", idadeMedia));
        
        int maiorIdade = pessoas.stream()
            .mapToInt(p -> p.idade)
            .max()
            .orElse(0);
        System.out.println("Maior idade: " + maiorIdade);
        
        // ============================================
        // 5. METHOD REFERENCES
        // ============================================
        System.out.println("\n5. METHOD REFERENCES\n");
        System.out.println("Uma forma mais concisa de usar lambdas");
        
        List<String> palavras = Arrays.asList("java", "python", "javascript");
        
        System.out.println("Com lambda:");
        palavras.forEach(p -> System.out.println("  " + p.toUpperCase()));
        
        System.out.println("\nCom method reference:");
        palavras.forEach(System.out::println);  // :: é o operador de method reference
        
        // ============================================
        // 6. RESUMO
        // ============================================
        System.out.println("\n=== RESUMO ===\n");
        System.out.println("Generics<T>      - Type safety");
        System.out.println("Lambda x -> ...  - Funções anônimas");
        System.out.println("stream()         - Processamento de dados");
        System.out.println("map()            - Transformar elementos");
        System.out.println("filter()         - Selecionar elementos");
        System.out.println("reduce()         - Agregar valores");
        System.out.println("collect()        - Coletar resultados");
        System.out.println("forEach()        - Iterar");
        System.out.println("::               - Method reference");
    }
}

// ============================================
// INTERFACE FUNCIONAL
// ============================================

@FunctionalInterface
interface Operacao {
    int calcular(int a, int b);
}

// ============================================
// CLASSE GENÉRICA
// ============================================

class Caixa<T> {
    private T conteudo;
    
    public Caixa(T conteudo) {
        this.conteudo = conteudo;
    }
    
    public T obter() {
        return conteudo;
    }
    
    public void guardar(T conteudo) {
        this.conteudo = conteudo;
    }
}

// ============================================
// CLASSE AUXILIAR
// ============================================

class PessoaFase6 {
    public String nome;
    public int idade;
    
    public PessoaFase6(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    @Override
    public String toString() {
        return nome + " (" + idade + " anos)";
    }
}
