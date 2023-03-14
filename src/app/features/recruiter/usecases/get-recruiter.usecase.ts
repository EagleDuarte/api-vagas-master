import { UserRepository } from "../../user/repositories/user.repository";

export class getRecruiterUseCase {
    public async execute(username: string) {
        const repository = new UserRepository();

        const result = await repository.findByUsernamePassword(username);

        if (!result) {
            return null;
        }

        return result.toJson();
    }
}
