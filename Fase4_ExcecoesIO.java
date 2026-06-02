/**
 * FASE 4: EXCEÇÕES E I/O (Input/Output)
 * 
 * Tratamento de erros e leitura/escrita de arquivos
 * Em Python: try/except/finally
 * Em Java:   try/catch/finally
 */

import java.io.*;
import java.util.Scanner;

public class Fase4_ExcecoesIO {
    
    public static void main(String[] args) {
        System.out.println("=== FASE 4: EXCEÇÕES E I/O ===\n");
        
        // ============================================
        // 1. TRATAMENTO DE EXCEÇÕES
        // ============================================
        System.out.println("1. TRATAMENTO DE EXCEÇÕES\n");
        System.out.println("Python: try:    → Java: try {");
        System.out.println("        except: →       } catch (ExceptionType e) {");
        System.out.println("        finally →       } finally {");
        
        // Exemplo 1: Divisão por zero
        System.out.println("\nExemplo 1: Divisão por zero");
        try {
            int resultado = dividir(10, 0);
            System.out.println("Resultado: " + resultado);
        } catch (ArithmeticException e) {
            System.out.println("❌ ERRO: " + e.getMessage());
        }
        
        // Exemplo 2: Conversão de tipo
        System.out.println("\nExemplo 2: Conversão inválida de String para número");
        try {
            String numero = "abc";
            int n = Integer.parseInt(numero);
            System.out.println("Número: " + n);
        } catch (NumberFormatException e) {
            System.out.println("❌ ERRO: Não consegui converter '" + e + "' para número");
        }
        
        // Exemplo 3: Acesso a índice inválido
        System.out.println("\nExemplo 3: Acesso a índice inválido");
        try {
            int[] array = {1, 2, 3};
            System.out.println(array[5]);  // Índice não existe
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("❌ ERRO: Índice " + e.getMessage() + " inválido");
        }
        
        // ============================================
        // 2. MÚLTIPLOS CATCH
        // ============================================
        System.out.println("\n2. MÚLTIPLOS CATCH\n");
        
        try {
            String entrada = "123abc";
            int numero = Integer.parseInt(entrada);
            int[] array = {1, 2, 3};
            System.out.println(array[numero]);  // Pode dar erro
        } catch (NumberFormatException e) {
            System.out.println("❌ ERRO: Formato inválido - " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("❌ ERRO: Índice fora do alcance");
        } catch (Exception e) {  // Catch genérico
            System.out.println("❌ ERRO GERAL: " + e.getMessage());
        }
        
        // ============================================
        // 3. FINALLY
        // ============================================
        System.out.println("\n3. FINALLY (sempre executa)\n");
        
        try {
            System.out.println("Executando código...");
            int resultado = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("❌ ERRO: " + e.getMessage());
        } finally {
            System.out.println("✅ Este bloco SEMPRE executa (com ou sem erro)");
        }
        
        // ============================================
        // 4. TRY-WITH-RESOURCES (Java 7+)
        // ============================================
        System.out.println("\n4. TRY-WITH-RESOURCES (garante fechar recursos)\n");
        System.out.println("Lendo arquivo 'dados.txt':\n");
        
        // Try-with-resources fecha automaticamente o Scanner
        try (Scanner scanner = new Scanner(new File("dados.txt"))) {
            int linhas = 0;
            while (scanner.hasNextLine()) {
                String linha = scanner.nextLine();
                System.out.println("  " + linha);
                linhas++;
            }
            System.out.println("\nTotal de linhas: " + linhas);
        } catch (FileNotFoundException e) {
            System.out.println("❌ ERRO: Arquivo 'dados.txt' não encontrado");
            System.out.println("   Criando arquivo de exemplo...");
            criarArquivoExemplo();
        } catch (IOException e) {
            System.out.println("❌ ERRO ao ler arquivo: " + e.getMessage());
        }
        
        // ============================================
        // 5. LEITURA E ESCRITA DE ARQUIVOS
        // ============================================
        System.out.println("\n5. LEITURA E ESCRITA DE ARQUIVOS\n");
        
        // Escrever em arquivo
        String caminhoArquivo = "saida.txt";
        try {
            escreverArquivo(caminhoArquivo, 
                "Linha 1: Olá Java\n" +
                "Linha 2: Este é um arquivo criado por Java\n" +
                "Linha 3: Com múltiplas linhas\n");
            System.out.println("✅ Arquivo '" + caminhoArquivo + "' criado com sucesso");
        } catch (IOException e) {
            System.out.println("❌ ERRO ao escrever: " + e.getMessage());
        }
        
        // Ler arquivo
        try {
            System.out.println("\nLendo arquivo '" + caminhoArquivo + "':\n");
            lerArquivo(caminhoArquivo);
        } catch (IOException e) {
            System.out.println("❌ ERRO ao ler: " + e.getMessage());
        }
        
        // ============================================
        // 6. EXCEÇÕES PERSONALIZADAS
        // ============================================
        System.out.println("\n6. EXCEÇÕES PERSONALIZADAS\n");
        
        try {
            PessoaFase4 p = new PessoaFase4("João", -5);  // Idade negativa!
        } catch (IdadeInvalidaException e) {
            System.out.println("❌ ERRO: " + e.getMessage());
        }
        
        try {
            PessoaFase4 p = new PessoaFase4("João", 25);
            System.out.println("✅ Pessoa criada: " + p.getNome() + ", " + p.getIdade() + " anos");
        } catch (IdadeInvalidaException e) {
            System.out.println("❌ ERRO: " + e.getMessage());
        }
        
        // ============================================
        // 7. RESUMO
        // ============================================
        System.out.println("\n=== RESUMO ===\n");
        System.out.println("try        - bloco que pode gerar erro");
        System.out.println("catch      - captura e trata exceção");
        System.out.println("finally    - executa sempre");
        System.out.println("throw      - lança uma exceção");
        System.out.println("");
        System.out.println("FileNotFoundException - arquivo não existe");
        System.out.println("IOException          - erro de I/O");
        System.out.println("NumberFormatException - conversão inválida");
        System.out.println("");
        System.out.println("Scanner, FileWriter, FileReader - I/O básico");
        System.out.println("BufferedReader - leitura eficiente");
    }
    
    // ============================================
    // MÉTODOS AUXILIARES
    // ============================================
    
    public static int dividir(int a, int b) {
        return a / b;  // Pode lançar ArithmeticException
    }
    
    public static void escreverArquivo(String caminho, String conteudo) throws IOException {
        try (FileWriter writer = new FileWriter(caminho)) {
            writer.write(conteudo);
        }
    }
    
    public static void lerArquivo(String caminho) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(caminho))) {
            String linha;
            while ((linha = reader.readLine()) != null) {
                System.out.println("  " + linha);
            }
        }
    }
    
    public static void criarArquivoExemplo() {
        try {
            escreverArquivo("dados.txt", 
                "Java é uma linguagem compilada\n" +
                "Exceções são importantes para tratamento de erros\n" +
                "I/O em Java pode ser simplificado com Scanner\n");
            System.out.println("✅ Arquivo 'dados.txt' criado como exemplo");
        } catch (IOException e) {
            System.out.println("❌ Não consegui criar arquivo: " + e.getMessage());
        }
    }
}

// ============================================
// CLASSE PERSONALIZADA
// ============================================

class PessoaFase4 {
    private String nome;
    private int idade;
    
    public PessoaFase4(String nome, int idade) throws IdadeInvalidaException {
        if (idade < 0 || idade > 150) {
            throw new IdadeInvalidaException("Idade deve estar entre 0 e 150");
        }
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

// ============================================
// EXCEÇÃO PERSONALIZADA
// ============================================

/**
 * Exceção customizada - herda de Exception
 * Em Python: seria uma classe que herda de Exception
 */
class IdadeInvalidaException extends Exception {
    public IdadeInvalidaException(String mensagem) {
        super(mensagem);
    }
}
