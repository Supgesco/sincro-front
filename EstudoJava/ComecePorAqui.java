/**
 * COMECE AQUI! 🚀
 * 
 * Este é um programa simples para você começar a praticar
 * Execute e responda as perguntas
 */

import java.util.Scanner;

public class ComecePorAqui {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Bem-vindo
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║  BEM-VINDO AO MUNDO JAVA! 🚀           ║");
        System.out.println("║  Python para Java - Estudo Guiado       ║");
        System.out.println("╚════════════════════════════════════════╝\n");
        
        // Parte 1: Entrada de dados
        System.out.println("📋 PARTE 1: ENTRADA DE DADOS");
        System.out.print("Digite seu nome: ");
        String nome = scanner.nextLine();
        
        System.out.print("Digite sua idade: ");
        int idade = scanner.nextInt();
        scanner.nextLine();  // Limpar buffer
        
        System.out.print("Qual seu mês de nascimento (1-12): ");
        int mes = scanner.nextInt();
        scanner.nextLine();
        
        // Parte 2: Processamento (lógica)
        System.out.println("\n📊 PARTE 2: PROCESSAMENTO");
        
        // Validação
        if (idade < 0 || idade > 120) {
            System.out.println("❌ Idade inválida!");
            scanner.close();
            return;
        }
        
        // Categorizar idade
        String categoria;
        if (idade < 13) {
            categoria = "Criança";
        } else if (idade < 18) {
            categoria = "Adolescente";
        } else if (idade < 60) {
            categoria = "Adulto";
        } else {
            categoria = "Idoso";
        }
        
        // Estação do ano
        String estacao;
        if (mes >= 3 && mes <= 5) {
            estacao = "Outono";
        } else if (mes >= 6 && mes <= 8) {
            estacao = "Inverno";
        } else if (mes >= 9 && mes <= 11) {
            estacao = "Primavera";
        } else {
            estacao = "Verão";
        }
        
        // Parte 3: Saída (resultado)
        System.out.println("\n✅ PARTE 3: RESULTADO");
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║ INFORMAÇÕES PROCESSADAS                 ║");
        System.out.println("╠════════════════════════════════════════╣");
        System.out.println("║ Nome: " + String.format("%-33s", nome) + "║");
        System.out.println("║ Idade: " + String.format("%-32s", idade) + "║");
        System.out.println("║ Categoria: " + String.format("%-27s", categoria) + "║");
        System.out.println("║ Mês de nascimento: " + String.format("%-21s", mes) + "║");
        System.out.println("║ Estação: " + String.format("%-29s", estacao) + "║");
        System.out.println("╚════════════════════════════════════════╝\n");
        
        // Parte 4: Loops e Collections
        System.out.println("🔄 PARTE 4: REPETIÇÃO (LOOPS)");
        
        System.out.println("\nContagem de 1 a " + idade + ":");
        for (int i = 1; i <= idade; i += 5) {
            System.out.print(i + " ");
        }
        System.out.println("\n");
        
        // Parte 5: Array
        System.out.println("📚 PARTE 5: ARRAYS");
        
        int[] numeros = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        System.out.println("Array original: ");
        imprimirArray(numeros);
        
        // Filtrar números maiores que 5
        System.out.println("\nNúmeros maiores que 5:");
        for (int num : numeros) {
            if (num > 5) {
                System.out.print(num + " ");
            }
        }
        System.out.println("\n");
        
        // Parte 6: Exercício
        System.out.println("💪 PARTE 6: EXERCÍCIO");
        
        System.out.print("\nDigite um número de 1 a 10 para ver a tabuada: ");
        int tabuada = scanner.nextInt();
        
        if (tabuada >= 1 && tabuada <= 10) {
            System.out.println("\nTabuada do " + tabuada + ":");
            for (int i = 1; i <= 10; i++) {
                System.out.println(tabuada + " × " + i + " = " + (tabuada * i));
            }
        } else {
            System.out.println("❌ Número inválido!");
        }
        
        // Despedida
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║ Parabéns, " + String.format("%-26s", nome) + "║");
        System.out.println("║ Você completou seu primeiro programa!   ║");
        System.out.println("║ Próximo: Estude a Fase 1!              ║");
        System.out.println("╚════════════════════════════════════════╝\n");
        
        scanner.close();
    }
    
    // Método auxiliar
    public static void imprimirArray(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

/* 
 * CONCEITOS USADOS NESTE PROGRAMA:
 * 
 * ✅ main() - ponto de entrada
 * ✅ Scanner - entrada de dados
 * ✅ Variáveis e tipos (String, int)
 * ✅ Operadores (+, -, >, <, <=, >=)
 * ✅ If/else/else if - decisões
 * ✅ For loop - repetição
 * ✅ For-each - iteração sobre array
 * ✅ Array - coleção de dados
 * ✅ System.out.println() - saída
 * ✅ String.format() - formatação
 * ✅ Métodos - reutilização de código
 * 
 * PRÓXIMOS PASSOS:
 * 1. Execute este programa
 * 2. Modifique os valores
 * 3. Entenda cada parte
 * 4. Estude Fase 1: Fundamentos
 */
