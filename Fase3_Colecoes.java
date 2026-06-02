/**
 * FASE 3: COLEÇÕES
 * 
 * Em Python: listas, tuplas, dicionários, sets
 * Em Java: arrays, ArrayList, HashMap, HashSet, etc.
 * 
 * Python é muito mais flexível, Java é mais typed
 */

import java.util.*;

public class Fase3_Colecoes {
    
    public static void main(String[] args) {
        System.out.println("=== FASE 3: COLEÇÕES EM JAVA ===\n");
        
        // ============================================
        // 1. ARRAYS (vetores fixos)
        // ============================================
        System.out.println("1. ARRAYS\n");
        System.out.println("Python: lista = [1, 2, 3, 4, 5]");
        System.out.println("Java:   int[] array = {1, 2, 3, 4, 5};");
        
        // Array de inteiros - tamanho fixo
        int[] numeros = {1, 2, 3, 4, 5};
        
        System.out.println("\nAcessando elementos:");
        System.out.println("numeros[0] = " + numeros[0]);
        System.out.println("numeros[4] = " + numeros[4]);
        System.out.println("numeros.length = " + numeros.length);
        
        // Iterando sobre array
        System.out.println("\nIterando com for clássico:");
        for (int i = 0; i < numeros.length; i++) {
            System.out.print(numeros[i] + " ");
        }
        System.out.println();
        
        // Enhanced for loop (for-each) - similar ao for in do Python
        System.out.println("\nEnhanced for loop (for-each):");
        for (int num : numeros) {
            System.out.print(num + " ");
        }
        System.out.println("\n");
        
        // Array de Strings
        String[] cores = {"Vermelho", "Verde", "Azul"};
        System.out.println("Array de Strings: " + Arrays.toString(cores));
        
        // Array bidimensional (matriz)
        System.out.println("\nArray Bidimensional (Matriz):");
        int[][] matriz = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                System.out.print(matriz[i][j] + " ");
            }
            System.out.println();
        }
        
        // ============================================
        // 2. ARRAYLIST (dinâmico)
        // ============================================
        System.out.println("\n2. ARRAYLIST (lista dinâmica)\n");
        System.out.println("Python: lista = [1, 2, 3] # pode crescer");
        System.out.println("Java:   List<Integer> lista = new ArrayList<>();");
        
        // ArrayList é como uma lista Python - cresce dinamicamente
        List<Integer> numeros_dinamicos = new ArrayList<>();
        
        numeros_dinamicos.add(10);
        numeros_dinamicos.add(20);
        numeros_dinamicos.add(30);
        
        System.out.println("Lista: " + numeros_dinamicos);
        System.out.println("Tamanho: " + numeros_dinamicos.size());
        System.out.println("Primeiro elemento: " + numeros_dinamicos.get(0));
        System.out.println("Último elemento: " + numeros_dinamicos.get(numeros_dinamicos.size() - 1));
        
        // Remover
        numeros_dinamicos.remove(1);  // Remove elemento no índice 1
        System.out.println("Após remover índice 1: " + numeros_dinamicos);
        
        // Verificar se contém
        System.out.println("Contém 10? " + numeros_dinamicos.contains(10));
        System.out.println("Contém 100? " + numeros_dinamicos.contains(100));
        
        // ArrayList de Strings
        List<String> palavras = new ArrayList<>();
        palavras.add("Java");
        palavras.add("é");
        palavras.add("incrível");
        
        System.out.println("\nPalavras: " + palavras);
        for (String palavra : palavras) {
            System.out.print(palavra + " ");
        }
        System.out.println();
        
        // ============================================
        // 3. SET (conjunto - sem duplicatas)
        // ============================================
        System.out.println("\n3. SET (conjunto sem duplicatas)\n");
        System.out.println("Python: conjunto = {1, 2, 3}");
        System.out.println("Java:   Set<Integer> conjunto = new HashSet<>();");
        
        Set<Integer> conjunto = new HashSet<>();
        conjunto.add(1);
        conjunto.add(2);
        conjunto.add(3);
        conjunto.add(1);  // Duplicata - será ignorada
        
        System.out.println("Conjunto: " + conjunto);
        System.out.println("Tamanho: " + conjunto.size());  // Será 3, não 4
        
        Set<String> linguagens = new HashSet<>();
        linguagens.add("Python");
        linguagens.add("Java");
        linguagens.add("JavaScript");
        linguagens.add("Python");  // Duplicata
        
        System.out.println("Linguagens: " + linguagens);
        
        // ============================================
        // 4. MAP (dicionário)
        // ============================================
        System.out.println("\n4. MAP (dicionário)\n");
        System.out.println("Python: dicionario = {'nome': 'João', 'idade': 25}");
        System.out.println("Java:   Map<String, Object> map = new HashMap<>();");
        
        // HashMap - chave-valor
        Map<String, Object> pessoa = new HashMap<>();
        pessoa.put("nome", "João");
        pessoa.put("idade", 25);
        pessoa.put("altura", 1.75);
        pessoa.put("ativo", true);
        
        System.out.println("Pessoa: " + pessoa);
        System.out.println("Nome: " + pessoa.get("nome"));
        System.out.println("Idade: " + pessoa.get("idade"));
        
        // Verificar se contém chave
        System.out.println("\nContém chave 'nome'? " + pessoa.containsKey("nome"));
        System.out.println("Contém chave 'email'? " + pessoa.containsKey("email"));
        
        // Iterar sobre Map
        System.out.println("\nIterando sobre Map:");
        for (String chave : pessoa.keySet()) {
            System.out.println("  " + chave + ": " + pessoa.get(chave));
        }
        
        // Map com valores tipados
        Map<String, Integer> idades = new HashMap<>();
        idades.put("João", 25);
        idades.put("Maria", 30);
        idades.put("Carlos", 35);
        
        System.out.println("\nIdades: " + idades);
        
        // Remover
        idades.remove("Maria");
        System.out.println("Após remover Maria: " + idades);
        
        // ============================================
        // 5. LISTA DE OBJETOS
        // ============================================
        System.out.println("\n5. LISTA DE OBJETOS\n");
        
        List<PessoaFase3> pessoas = new ArrayList<>();
        pessoas.add(new PessoaFase3("João", 25));
        pessoas.add(new PessoaFase3("Maria", 30));
        pessoas.add(new PessoaFase3("Carlos", 35));
        
        System.out.println("Pessoas:");
        for (PessoaFase3 p : pessoas) {
            System.out.println("  " + p.getNome() + " - " + p.getIdade() + " anos");
        }
        
        // ============================================
        // 6. COMPARAÇÃO: OPERAÇÕES COMUNS
        // ============================================
        System.out.println("\n6. OPERAÇÕES COMUNS\n");
        
        List<Integer> nums = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        System.out.println("Lista original: " + nums);
        
        // Ordenar
        Collections.sort(nums);
        System.out.println("Após sort: " + nums);
        
        // Reverter
        Collections.reverse(nums);
        System.out.println("Após reverse: " + nums);
        
        // Stream operations (Java 8+)
        System.out.println("\nStream Operations (Java 8+):");
        System.out.println("Python: [x*2 for x in lista]");
        System.out.println("Java:   lista.stream().map(x -> x*2).toList()");
        
        List<Integer> dobrados = nums.stream()
            .map(x -> x * 2)
            .toList();
        System.out.println("Dobrados: " + dobrados);
        
        // Filtrar
        System.out.println("\nFiltrar números maiores que 4:");
        List<Integer> maioresQue4 = nums.stream()
            .filter(x -> x > 4)
            .toList();
        System.out.println("Resultado: " + maioresQue4);
        
        // Soma
        int soma = nums.stream()
            .reduce(0, Integer::sum);
        System.out.println("Soma de todos: " + soma);
        
        // ============================================
        // 7. RESUMO
        // ============================================
        System.out.println("\n=== RESUMO ===\n");
        System.out.println("Array[]          - tamanho fixo, rápido acesso");
        System.out.println("ArrayList<T>     - tamanho dinâmico, similar lista Python");
        System.out.println("LinkedList<T>    - para inserção/remoção frequentes");
        System.out.println("HashSet<T>       - sem duplicatas");
        System.out.println("HashMap<K,V>     - dicionário Python");
        System.out.println("TreeMap<K,V>     - ordenado por chave");
        System.out.println("\nGenéricos <T>    - definem o tipo (type safety)");
    }
}

// Classe auxiliar
class PessoaFase3 {
    private String nome;
    private int idade;
    
    public PessoaFase3(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    public String getNome() {
        return nome;
    }
    
    public int getIdade() {
        return idade;
    }
}
