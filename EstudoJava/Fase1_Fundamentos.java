/**
 * FASE 1: FUNDAMENTOS DE JAVA
 * Estudo comparado com Python
 * 
 * Topics:
 * 1. Estrutura básica (package, classe, main)
 * 2. Variáveis e tipos de dados
 * 3. Operadores
 * 4. Entrada e saída (Input/Output)
 * 5. Controle de fluxo (if, while, for)
 */

import java.util.Scanner;

public class Fase1_Fundamentos {
    
    public static void main(String[] args) {
        // ============================================
        // 1. ESTRUTURA BÁSICA
        // ============================================
        System.out.println("\n=== 1. ESTRUTURA BÁSICA ===");
        System.out.println("Em Java, TODO programa começa com uma classe (public class)");
        System.out.println("E todo código executável está dentro de main(String[] args)");
        System.out.println("Comparação com Python:");
        System.out.println("  Python:  if __name__ == '__main__': → Java: public static void main()");
        
        // ============================================
        // 2. VARIÁVEIS E TIPOS PRIMITIVOS
        // ============================================
        System.out.println("\n=== 2. VARIÁVEIS E TIPOS DE DADOS ===");
        
        // Python não precisa declarar tipo. Java SIM!
        // Python: x = 5
        // Java:
        int idade = 25;
        System.out.println("int idade = " + idade);
        
        // Outros tipos primitivos
        double altura = 1.75;           // float em Python, mas precisão dupla
        boolean ativo = true;           // Em Python: True (capital)
        char letra = 'A';               // String com 1 char em Python
        long numeroGrande = 9223372036854775807L;  // Para inteiros muito grandes
        float numeroDecimal = 3.14f;    // Precisão simples
        byte numeroPequeno = 127;              // -128 a 127
        short numeroMedio = 32000;      // -32768 a 32767
        
        System.out.println("double altura = " + altura);
        System.out.println("boolean ativo = " + ativo);
        System.out.println("char letra = " + letra);
        
        // Diferença importante: String é uma CLASSE (não primitivo)
        // Python: name = "João"
        // Java:
        String nome = "João";
        System.out.println("String nome = " + nome);
        
        System.out.println("\nTipos Primitivos Java vs Python:");
        System.out.println("  int        ↔ Python: int (32 bits)");
        System.out.println("  double     ↔ Python: float");
        System.out.println("  boolean    ↔ Python: bool");
        System.out.println("  char       ↔ Python: str (1 caractere)");
        System.out.println("  String     ↔ Python: str (mas é uma classe!)");
        
        // ============================================
        // 3. OPERADORES
        // ============================================
        System.out.println("\n=== 3. OPERADORES ===");
        
        int a = 10, b = 3;
        
        // Aritméticos (igual Python)
        System.out.println("Operadores Aritméticos:");
        System.out.println("  " + a + " + " + b + " = " + (a + b));
        System.out.println("  " + a + " - " + b + " = " + (a - b));
        System.out.println("  " + a + " * " + b + " = " + (a * b));
        System.out.println("  " + a + " / " + b + " = " + (a / b));      // Divisão inteira (como Python 2)
        System.out.println("  " + a + " % " + b + " = " + (a % b));      // Módulo
        System.out.println("  " + a + " ** " + b + " = " + Math.pow(a, b)); // Potência (em Python: **)
        
        // Incremento/Decremento (diferente de Python)
        int contador = 5;
        System.out.println("\nIncremento/Decremento (não existe em Python):");
        System.out.println("  contador++ = " + (contador++)); // Pós-incremento
        System.out.println("  contador agora = " + contador);
        System.out.println("  ++contador = " + (++contador)); // Pré-incremento
        
        // Comparação
        System.out.println("\nOperadores de Comparação:");
        System.out.println("  10 == 10: " + (10 == 10));     // Igual (Python: ==)
        System.out.println("  10 != 5:  " + (10 != 5));      // Diferente (Python: !=)
        System.out.println("  10 > 5:   " + (10 > 5));       // Maior
        System.out.println("  10 < 5:   " + (10 < 5));       // Menor
        
        // Lógicos
        System.out.println("\nOperadores Lógicos:");
        System.out.println("  true && false = " + (true && false));  // AND (Python: and)
        System.out.println("  true || false = " + (true || false));  // OR (Python: or)
        System.out.println("  !true = " + (!true));                  // NOT (Python: not)
        
        // ============================================
        // 4. ENTRADA DE DADOS
        // ============================================
        System.out.println("\n=== 4. ENTRADA DE DADOS (Input) ===");
        System.out.println("Python usa: input()");
        System.out.println("Java usa: Scanner");
        
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Digite seu nome: ");
        String nomeDigitado = scanner.nextLine();  // Lê uma linha inteira
        System.out.println("Olá, " + nomeDigitado + "!");
        
        System.out.print("Digite sua idade: ");
        int idadeDigitada = scanner.nextInt();     // Lê um inteiro
        scanner.nextLine();  // IMPORTANTE: limpar o buffer após ler número
        System.out.println("Você tem " + idadeDigitada + " anos");
        
        // ============================================
        // 5. CONTROLE DE FLUXO
        // ============================================
        System.out.println("\n=== 5. CONTROLE DE FLUXO ===");
        
        // IF/ELSE (igual Python, mas com sintaxe diferente)
        System.out.println("\nIF/ELSE:");
        int numero = 15;
        if (numero > 10) {
            System.out.println("O número é maior que 10");
        } else if (numero == 10) {
            System.out.println("O número é igual a 10");
        } else {
            System.out.println("O número é menor que 10");
        }
        
        // SWITCH (não existe em Python puro, mas util em Java)
        System.out.println("\nSWITCH:");
        int dia = 3;
        String nomeDia = "";
        switch (dia) {
            case 1:
                nomeDia = "Segunda";
                break;
            case 2:
                nomeDia = "Terça";
                break;
            case 3:
                nomeDia = "Quarta";
                break;
            default:
                nomeDia = "Outro dia";
        }
        System.out.println("Dia " + dia + " é: " + nomeDia);
        
        // FOR LOOP
        System.out.println("\nFOR LOOP:");
        System.out.println("Python: for i in range(5):");
        System.out.println("Java:   for (int i = 0; i < 5; i++)");
        for (int i = 0; i < 5; i++) {
            System.out.println("  Iteração " + i);
        }
        
        // WHILE LOOP
        System.out.println("\nWHILE LOOP:");
        int contador2 = 0;
        while (contador2 < 3) {
            System.out.println("  Contagem: " + contador2);
            contador2++;
        }
        
        // DO-WHILE (não existe em Python)
        System.out.println("\nDO-WHILE (executa pelo menos uma vez):");
        int x = 0;
        do {
            System.out.println("  X = " + x);
            x++;
        } while (x < 2);
        
        // ============================================
        // RESUMO
        // ============================================
        System.out.println("\n=== RESUMO FINAL ===");
        System.out.println("Diferenças principais Java vs Python:");
        System.out.println("1. Java EXIGE declaração de tipos (strongly typed)");
        System.out.println("2. Java exige ponto-e-vírgula (;) no final de statements");
        System.out.println("3. Java exige chaves {} para blocos (Python usa indentação)");
        System.out.println("4. Java é compiled, Python é interpretado");
        System.out.println("5. String é uma classe em Java, não um primitivo");
        System.out.println("6. Input/Output completamente diferente");
        
        scanner.close(); // Sempre fechar o scanner
    }
}
