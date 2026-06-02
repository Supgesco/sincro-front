/**
 * FASE 2: ORIENTAÇÃO A OBJETOS (OOP)
 * 
 * Python e Java são ambas OOP, mas Java FORÇA o paradigma
 * Em Python, você pode fazer procedural se quiser
 * Em Java, TUDO é classe
 */

public class Fase2_OOP {
    
    public static void main(String[] args) {
        System.out.println("=== FASE 2: PROGRAMAÇÃO ORIENTADA A OBJETOS ===\n");
        
        // ============================================
        // 1. CRIANDO E USANDO OBJETOS
        // ============================================
        System.out.println("1. CRIANDO OBJETOS\n");
        
        // Assim como em Python, você cria instâncias:
        // Python: pessoa = Pessoa("João", 25)
        // Java:
        Pessoa pessoa1 = new Pessoa("João", 25);
        Pessoa pessoa2 = new Pessoa("Maria", 30);
        
        System.out.println(pessoa1.apresentar());
        System.out.println(pessoa2.apresentar());
        
        // ============================================
        // 2. ENCAPSULAMENTO (Getters e Setters)
        // ============================================
        System.out.println("\n2. ENCAPSULAMENTO\n");
        System.out.println("Em Python usamos @property");
        System.out.println("Em Java usamos getters e setters");
        
        // Acessando dados privados via getters
        System.out.println("Nome: " + pessoa1.getNome());
        System.out.println("Idade: " + pessoa1.getIdade());
        
        // Modificando via setters
        pessoa1.setIdade(26);
        System.out.println("Idade após setIdade(26): " + pessoa1.getIdade());
        
        // ============================================
        // 3. HERANÇA
        // ============================================
        System.out.println("\n3. HERANÇA\n");
        
        // Criando objetos de classes derivadas
        // Python: class Funcionario(Pessoa):
        // Java:   public class Funcionario extends Pessoa
        
        Funcionario func1 = new Funcionario("Carlos", 35, "F001", 5000.0);
        Funcionario func2 = new Funcionario("Ana", 28, "F002", 4500.0);
        
        System.out.println(func1.apresentar());  // Herda método de Pessoa
        System.out.println(func1.getInfo());     // Método próprio de Funcionario
        
        System.out.println("\n" + func2.apresentar());
        System.out.println(func2.getInfo());
        
        // ============================================
        // 4. POLIMORFISMO
        // ============================================
        System.out.println("\n4. POLIMORFISMO\n");
        
        // Mesma mensagem, comportamentos diferentes
        // Python e Java suportam polimorfismo, mas Java é mais explícito
        
        Pessoa[] pessoas = {
            new Pessoa("João", 25),
            new Funcionario("Carlos", 35, "F001", 5000.0),
            new Gerente("Silva", 45, "F003", 7000.0, "TI")
        };
        
        System.out.println("Chamando apresentar() para diferentes tipos:\n");
        for (Pessoa p : pessoas) {
            System.out.println(p.apresentar());
        }
        
        // ============================================
        // 5. ABSTRAÇÃO
        // ============================================
        System.out.println("\n5. ABSTRAÇÃO COM INTERFACES\n");
        
        // Java tem interfaces para criar contratos
        Animal cachorro = new Cachorro("Rex");
        Animal gato = new Gato("Miau");
        
        System.out.println(cachorro.fazer_som());
        System.out.println(gato.fazer_som());
        System.out.println(cachorro.mover());
        System.out.println(gato.mover());
        
        // ============================================
        // 6. CONSTRUTORES E THIS
        // ============================================
        System.out.println("\n6. CONSTRUTORES\n");
        
        Veiculo v1 = new Veiculo("Toyota", "Corolla", 2020);
        Veiculo v2 = new Veiculo("Honda");  // Construtor sobrecarregado
        
        System.out.println("Veículo 1: " + v1.descricao());
        System.out.println("Veículo 2: " + v2.descricao());
        
        // ============================================
        // 7. COMPARAÇÃO: PYTHON vs JAVA
        // ============================================
        System.out.println("\n7. COMPARAÇÃO: PYTHON vs JAVA\n");
        
        System.out.println("PYTHON:");
        System.out.println("""
            class Pessoa:
                def __init__(self, nome, idade):
                    self.nome = nome
                    self.idade = idade
                
                def apresentar(self):
                    return f"Olá, sou {self.nome}"
            
            class Funcionario(Pessoa):
                def __init__(self, nome, idade, funcionario_id):
                    super().__init__(nome, idade)
                    self.funcionario_id = funcionario_id
            """);
        
        System.out.println("\nJAVA:");
        System.out.println("""
            public class Pessoa {
                private String nome;
                private int idade;
                
                public Pessoa(String nome, int idade) {
                    this.nome = nome;
                    this.idade = idade;
                }
                
                public String apresentar() {
                    return "Olá, sou " + this.nome;
                }
            }
            
            public class Funcionario extends Pessoa {
                private String funcionarioId;
                
                public Funcionario(String nome, int idade, String id) {
                    super(nome, idade);  // Chama construtor da classe pai
                    this.funcionarioId = id;
                }
            }
            """);
        
        System.out.println("\n=== FIM DA FASE 2 ===");
    }
}

// ============================================
// CLASSES DE EXEMPLO
// ============================================

/**
 * Classe base simples
 * Em Python: class Pessoa:
 */
class Pessoa {
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
    
    public int getIdade() {
        return idade;
    }
    
    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public void setIdade(int idade) {
        if (idade > 0 && idade < 150) {
            this.idade = idade;
        }
    }
    
    // Métodos
    public String apresentar() {
        return "Olá, sou " + nome + " e tenho " + idade + " anos.";
    }
}

/**
 * Classe derivada - HERANÇA
 * Em Python: class Funcionario(Pessoa):
 * Em Java:   public class Funcionario extends Pessoa
 */
class Funcionario extends Pessoa {
    private String funcionarioId;
    private double salario;
    
    public Funcionario(String nome, int idade, String funcionarioId, double salario) {
        super(nome, idade);  // Chama construtor da classe pai
        this.funcionarioId = funcionarioId;
        this.salario = salario;
    }
    
    public String getFuncionarioId() {
        return funcionarioId;
    }
    
    public double getSalario() {
        return salario;
    }
    
    // Sobrescrita de método
    @Override
    public String apresentar() {
        return super.apresentar() + " Sou funcionário(a) com ID: " + funcionarioId;
    }
    
    public String getInfo() {
        return "ID: " + funcionarioId + ", Salário: R$ " + String.format("%.2f", salario);
    }
}

/**
 * Outra classe derivada - demonstra POLIMORFISMO
 */
class Gerente extends Funcionario {
    private String departamento;
    
    public Gerente(String nome, int idade, String funcionarioId, double salario, String departamento) {
        super(nome, idade, funcionarioId, salario);
        this.departamento = departamento;
    }
    
    @Override
    public String apresentar() {
        return super.apresentar() + " Sou gerente de " + departamento;
    }
}

/**
 * INTERFACE - Define um contrato
 * Em Python: usamos ABC (Abstract Base Class)
 * Em Java:   interface
 */
interface Animal {
    String fazer_som();
    String mover();
}

/**
 * Implementação de interface
 */
class Cachorro implements Animal {
    private String nome;
    
    public Cachorro(String nome) {
        this.nome = nome;
    }
    
    @Override
    public String fazer_som() {
        return nome + " faz: Au au!";
    }
    
    @Override
    public String mover() {
        return nome + " está correndo com 4 patas";
    }
}

/**
 * Outra implementação da mesma interface - POLIMORFISMO
 */
class Gato implements Animal {
    private String nome;
    
    public Gato(String nome) {
        this.nome = nome;
    }
    
    @Override
    public String fazer_som() {
        return nome + " faz: Miau!";
    }
    
    @Override
    public String mover() {
        return nome + " está caminhando elegantemente";
    }
}

/**
 * Exemplo de construtores sobrecarregados
 * Em Python: usamos *args e **kwargs
 * Em Java:   criamos múltiplos construtores
 */
class Veiculo {
    private String marca;
    private String modelo;
    private int ano;
    
    // Construtor completo
    public Veiculo(String marca, String modelo, int ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
    
    // Construtor sobrecarregado (overload)
    public Veiculo(String marca) {
        this.marca = marca;
        this.modelo = "Desconhecido";
        this.ano = 0;
    }
    
    public String descricao() {
        return marca + " " + modelo + " (" + ano + ")";
    }
}
