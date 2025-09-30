import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Team() {
  const teamMembers = [
    {
      name: "Ishita Raikar",
      role: "Project Lead",
      description: "Computer Science student leading the development of AI models and coordinating research efforts for seasonal glacier flow prediction."
    },
    {
      name: "Sakshi Podhade", 
      role: "Project Lead",
      description: "Engineering student specializing in data analysis and machine learning implementation for climate data processing and visualization."
    },
    {
      name: "Isha Salvi",
      role: "Project Lead",
      description: "Research student focusing on water resource modeling and developing user interfaces for the prediction dashboard system."
    }
  ];

  return (
    <section id="team" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl text-foreground">
            Our Team
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A multidisciplinary team of researchers, scientists, and engineers 
            dedicated to advancing climate resilience through technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader className="space-y-3">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-sm font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <div className="text-sm text-primary font-medium">{member.role}</div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm">
                  {member.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-muted-foreground">
            Academic Project
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <span>Student Research Initiative</span>
            <span>•</span>
            <span>Climate Technology Focus</span>
            <span>•</span>
            <span>Water Resource Management</span>
          </div>
        </div>
      </div>
    </section>
  );
}