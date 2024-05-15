import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    enrollCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payFees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }
    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    enrollStudent(studentID, course) {
        let student = this.findStudent(studentID);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    viewStudentBalance(studentID) {
        let student = this.findStudent(studentID);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    payStudentFees(studentID, amount) {
        let student = this.findStudent(studentID);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    showStudentStatus(studentID) {
        let student = this.findStudent(studentID);
        if (student) {
            student.showStatus();
        }
    }
    findStudent(studentID) {
        return this.students.find((std) => std.id === studentID);
    }
}
async function main() {
    console.log("Welcome To Daniyal's Student Management System Project");
    console.log("-".repeat(60));
    let studentManager = new StudentManager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: ["Add Student", "Enroll Course", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
            }
        ]);
        switch (choice.choice) {
            case "Add Student":
                let studentName = await inquirer.prompt({ name: "name", message: "Enter student name:" });
                studentManager.addStudent(studentName.name);
                break;
            case "Enroll Course":
                let enrollmentDetails = await inquirer.prompt([
                    { name: "studentID", message: "Enter student ID:" },
                    { name: "course", message: "Enter course name:" }
                ]);
                studentManager.enrollStudent(parseInt(enrollmentDetails.studentID), enrollmentDetails.course);
                break;
            case "View Student Balance":
                let studentIDForBalance = await inquirer.prompt({ name: "studentID", message: "Enter student ID:" });
                studentManager.viewStudentBalance(parseInt(studentIDForBalance.studentID));
                break;
            case "Pay Fees":
                let paymentDetails = await inquirer.prompt([
                    { name: "studentID", message: "Enter student ID:" },
                    { name: "amount", message: "Enter amount to pay:" }
                ]);
                studentManager.payStudentFees(parseInt(paymentDetails.studentID), parseInt(paymentDetails.amount));
                break;
            case "Show Status":
                let studentIDForStatus = await inquirer.prompt({ name: "studentID", message: "Enter student ID:" });
                studentManager.showStudentStatus(parseInt(studentIDForStatus.studentID));
                break;
            case "Exit":
                console.log("Thank you for using the Student Management System. Goodbye!");
                process.exit(0);
        }
    }
}
main();
