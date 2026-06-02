/**
 * FASE 5: API STRING E DATAS
 * 
 * Strings em Java vs Python
 * Em Python: muito simples com métodos nativos
 * Em Java: mais formal, mas poderoso
 */

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class Fase5_StringsDatas {
    
    public static void main(String[] args) {
        System.out.println("=== FASE 5: STRINGS E DATAS ===\n");
        
        // ============================================
        // 1. OPERAÇÕES COM STRINGS
        // ============================================
        System.out.println("1. OPERAÇÕES COM STRINGS\n");
        
        String texto = "  Olá, Java!  ";
        
        System.out.println("String original: '" + texto + "'");
        System.out.println("Length: " + texto.length());
        System.out.println("Upper case: " + texto.toUpperCase());
        System.out.println("Lower case: " + texto.toLowerCase());
        System.out.println("Trim: '" + texto.trim() + "'");  // Remove espaços
        
        // Buscar substring
        String frase = "Java é incrível";
        System.out.println("\nBuscas em: '" + frase + "'");
        System.out.println("Contém 'Java'? " + frase.contains("Java"));
        System.out.println("Contém 'Python'? " + frase.contains("Python"));
        System.out.println("Índice de 'é': " + frase.indexOf("é"));
        
        // Substituir
        System.out.println("Trocar 'Java' por 'Python': " + frase.replace("Java", "Python"));
        System.out.println("Trocar 'incrível' por 'poderoso': " + frase.replace("incrível", "poderoso"));
        
        // Dividir (split)
        System.out.println("\nDividindo: 'maçã,banana,laranja'.split(',')");
        String[] frutas = "maçã,banana,laranja".split(",");
        for (String fruta : frutas) {
            System.out.println("  - " + fruta);
        }
        
        // Comparação
        System.out.println("\nComparações:");
        System.out.println("'Java'.equals('Java'): " + "Java".equals("Java"));
        System.out.println("'Java'.equals('java'): " + "Java".equals("java"));
        System.out.println("'Java'.equalsIgnoreCase('java'): " + "Java".equalsIgnoreCase("java"));
        System.out.println("'Java'.startsWith('Ja'): " + "Java".startsWith("Ja"));
        System.out.println("'Java'.endsWith('va'): " + "Java".endsWith("va"));
        
        // Substring
        System.out.println("\nExtrair substring:");
        String palavra = "programação";
        System.out.println("programação.substring(0, 7): " + palavra.substring(0, 7));
        System.out.println("programação.substring(7): " + palavra.substring(7));
        
        // ============================================
        // 2. STRING BUILDER (concatenação eficiente)
        // ============================================
        System.out.println("\n2. STRING BUILDER\n");
        System.out.println("Em Python: usar += é aceitável");
        System.out.println("Em Java:   usar StringBuilder para loops (mais eficiente)");
        
        // Forma INEFICIENTE
        String resultado = "";
        for (int i = 0; i < 5; i++) {
            resultado += "Item " + i + "\n";  // ❌ Ruim em loop
        }
        System.out.println("Com +=:\n" + resultado);
        
        // Forma EFICIENTE
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            sb.append("Item ").append(i).append("\n");  // ✅ Melhor
        }
        System.out.println("Com StringBuilder:\n" + sb.toString());
        
        // ============================================
        // 3. STRING FORMATTING
        // ============================================
        System.out.println("\n3. STRING FORMATTING\n");
        
        String nome = "João";
        int idade = 25;
        double altura = 1.75;
        
        // Método 1: Concatenação
        System.out.println("Concatenação: Meu nome é " + nome + " e tenho " + idade + " anos");
        
        // Método 2: String.format (como Python % ou .format())
        System.out.println("String.format: " + String.format("Meu nome é %s e tenho %d anos", nome, idade));
        
        // Método 3: Text blocks (Java 13+)
        String mensagem = """
            Nome: %s
            Idade: %d
            Altura: %.2f
            """.formatted(nome, idade, altura);
        System.out.println("Formatted:\n" + mensagem);
        
        // ============================================
        // 4. DATAS COM LOCAL DATE
        // ============================================
        System.out.println("\n4. TRABALHANDO COM DATAS\n");
        
        // Data atual
        LocalDate hoje = LocalDate.now();
        System.out.println("Data hoje: " + hoje);
        
        // Data específica
        LocalDate natal = LocalDate.of(2024, 12, 25);
        System.out.println("Natal 2024: " + natal);
        
        // Operações com datas
        System.out.println("\nOperações:");
        System.out.println("Amanhã: " + hoje.plusDays(1));
        System.out.println("Próximo mês: " + hoje.plusMonths(1));
        System.out.println("Próximo ano: " + hoje.plusYears(1));
        System.out.println("10 dias atrás: " + hoje.minusDays(10));
        
        // Comparação de datas
        System.out.println("\nComparações:");
        System.out.println("Natal é depois de hoje? " + natal.isAfter(hoje));
        System.out.println("Natal é antes de hoje? " + natal.isBefore(hoje));
        System.out.println("Natal é igual a hoje? " + natal.isEqual(hoje));
        
        // Dias entre datas
        long diasAteNatal = ChronoUnit.DAYS.between(hoje, natal);
        System.out.println("Dias até Natal: " + diasAteNatal);
        
        // ============================================
        // 5. DATETIME
        // ============================================
        System.out.println("\n5. DATA E HORA\n");
        
        LocalDateTime agora = LocalDateTime.now();
        System.out.println("Data e hora: " + agora);
        
        LocalDateTime especifico = LocalDateTime.of(2024, 12, 25, 18, 30, 0);
        System.out.println("Natal às 18:30: " + especifico);
        
        // ============================================
        // 6. FORMATAÇÃO DE DATAS
        // ============================================
        System.out.println("\n6. FORMATAÇÃO DE DATAS\n");
        
        DateTimeFormatter formatoBR = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatoEUA = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter formatoCompleto = DateTimeFormatter.ofPattern("dd 'de' MMMM 'de' yyyy");
        
        System.out.println("Padrão Brasil: " + hoje.format(formatoBR));
        System.out.println("Padrão EUA: " + hoje.format(formatoEUA));
        System.out.println("Completo: " + hoje.format(formatoCompleto));
        
        // ============================================
        // 7. CÁLCULO DE IDADE
        // ============================================
        System.out.println("\n7. EXEMPLO: CALCULADOR DE IDADE\n");
        
        LocalDate dataNascimento = LocalDate.of(1995, 3, 15);
        int anos = Period.between(dataNascimento, LocalDate.now()).getYears();
        System.out.println("Data de nascimento: " + dataNascimento.format(formatoBR));
        System.out.println("Idade: " + anos + " anos");
        
        // ============================================
        // 8. RESUMO DE MÉTODOS STRING
        // ============================================
        System.out.println("\n=== RESUMO: MÉTODOS STRING ===\n");
        System.out.println("length()              - tamanho");
        System.out.println("toUpperCase()         - maiúscula");
        System.out.println("toLowerCase()         - minúscula");
        System.out.println("trim()                - remove espaços");
        System.out.println("contains(str)         - contém substring");
        System.out.println("startsWith(str)       - começa com");
        System.out.println("endsWith(str)         - termina com");
        System.out.println("indexOf(str)          - posição");
        System.out.println("substring(start, end) - extrai parte");
        System.out.println("replace(old, new)     - substitui");
        System.out.println("split(delim)          - divide");
        System.out.println("equals(str)           - compara");
        System.out.println("equalsIgnoreCase()    - compara (ignora caso)");
        System.out.println("charAt(index)         - caractere");
        System.out.println("toCharArray()         - converte para array");
    }
}
